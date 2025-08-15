'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import MapGL, { Source, Layer, Marker, Popup, ViewState, MapLayerMouseEvent, FillLayer } from 'react-map-gl';
import type { FeatureCollection } from 'geojson';
import type { ExpressionSpecification } from 'mapbox-gl';
import { FlyToInterpolator } from '@deck.gl/core';
import { easeCubic } from 'd3-ease';
import { useState, useEffect, useCallback, useMemo } from 'react';

// Data
import indonesiaCitiesJson from '@/data/dataMAps/indonesia-cities1.json';
import { newsData, NewsItem as NewsItemType } from '@/data/dataMAps/newsData';
import { colorData } from '@/data/dataMAps/colorData';
import IconFilter from '@/components/icon/icon-filter';
import FilterDrawer from './uiMap/FilterDrawerMaps';

const drawerWidth = 288;
const drawerMargin = 16;

interface PopupInfo extends NewsItemType {
  name?: string;
  count?: number;
}

const indonesiaCities = indonesiaCitiesJson as FeatureCollection;

const buildFillColor = (
  activeColors: string[],
  counts: Record<string, number>,
  highlightedCity: string | null,
  selectedCategory: string,
): ExpressionSpecification => {
  const matchExpression: any[] = ['match', ['get', 'name']];

  const citiesFilteredByCategory: Set<string> = new Set();
  newsData.forEach((news) => {
    if (selectedCategory === 'All' || news.category === selectedCategory) {
      citiesFilteredByCategory.add(news.city);
    }
  });

  const cityColors: Record<string, string> = {};
  Object.keys(counts).forEach((city) => {
    const count = counts[city];
    const colorStep = colorData.find((step) => count >= step.minMentions && count <= step.maxMentions);

    if (colorStep && activeColors.includes(colorStep.label) && citiesFilteredByCategory.has(city)) {
      cityColors[city] = colorStep.color;
    } else {
      cityColors[city] = '';
    }
  });

  Object.entries(cityColors).forEach(([city, color]) => {
    matchExpression.push(city, color);
  });

  if (highlightedCity) {
    matchExpression.push(highlightedCity, '#00BFFF');
  }

  matchExpression.push('#e2e8f0');

  return matchExpression as ExpressionSpecification;
};

const choroplethLayer: FillLayer = {
  id: 'data-fill',
  type: 'fill',
  source: 'choropleth',
  paint: {
    'fill-opacity': 0.8,
    'fill-outline-color': '#4a5568',
  },
};

const defaultZoom = 6.2;
const defaultViewState: ViewState = {
  longitude: 110.5,
  latitude: -7,
  zoom: defaultZoom,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

export default function DistributionMap() {
  const [viewState, setViewState] = useState<ViewState>(defaultViewState);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showColor, setShowColor] = useState(true);
  const [activeColors, setActiveColors] = useState<string[]>(colorData.map(({ label }) => label));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [highlightedCity, setHighlightedCity] = useState<string | null>(null);

  const allCityMentions = useMemo(() => {
    return newsData.reduce(
      (acc, news) => {
        acc[news.city] = (acc[news.city] || 0) + news.mentions;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  const filteredNews = useMemo(() => {
    return newsData
      .filter((news) => {
        const passesCityFilter = selectedCity === 'All' || news.city === selectedCity;
        const passesCategoryFilter = selectedCategory === 'All' || news.category === selectedCategory;
        const count = allCityMentions[news.city];
        const colorStep = colorData.find((step) => count >= step.minMentions && count <= step.maxMentions);
        const passesColorFilter = !showColor || (colorStep && activeColors.includes(colorStep.label));

        return passesCityFilter && passesCategoryFilter && passesColorFilter;
      })
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  }, [selectedCity, selectedCategory, showColor, activeColors, allCityMentions]);

  const geoData = useMemo(() => {
    if (indonesiaCities.features) {
      const updated: FeatureCollection = {
        ...indonesiaCities,
        features: indonesiaCities.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            count: allCityMentions[f.properties?.name] || 0,
          },
        })),
      };
      return updated;
    }
    return null;
  }, [allCityMentions]);

  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      if (!geoData) return;

      const features = event.target.queryRenderedFeatures(event.point, {
        layers: ['data-fill'],
      });
      const feature = features[0];
      if (feature) {
        const properties = feature.properties;

        if (!properties) {
          setPopupInfo(null);
          setHighlightedCity(null);
          return;
        }

        const newsInCity = newsData.find((news) => news.city === properties.name);

        if (newsInCity) {
          setHighlightedCity(properties.name);
          setPopupInfo({
            ...newsInCity,
            name: properties.name,
            count: properties.count,
          });
          flyToLocation(newsInCity.lng, newsInCity.lat);
        } else {
          setPopupInfo(null);
          setHighlightedCity(null);
        }
      } else {
        setPopupInfo(null);
        setHighlightedCity(null);
      }
    },
    [geoData],
  );

  const toggleColor = (colorLabel: string) => {
    setActiveColors((prev) =>
      prev.includes(colorLabel) ? prev.filter((c) => c !== colorLabel) : [...prev, colorLabel],
    );
  };

  const flyToLocation = (longitude: number, latitude: number, zoom = 10) => {
    setViewState((vs) => ({
      ...vs,
      longitude,
      latitude,
      zoom,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    }));
  };

  const handleSetSelectedCity = useCallback(
    (city: string, lng?: number, lat?: number) => {
      setSelectedCity(city);
      setHighlightedCity(city === 'All' ? null : city);
      if (lng && lat) {
        flyToLocation(lng, lat);
      }
    },
    [flyToLocation],
  );

  const resetMap = () => {
    setViewState((vs) => ({
      ...defaultViewState,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic,
    }));
    setPopupInfo(null);
    setSelectedCity('All');
    setSelectedCategory('All');
    setActiveColors(colorData.map(({ label }) => label));
    setHighlightedCity(null);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const mapPaddingRight = drawerOpen ? drawerWidth + drawerMargin : drawerMargin;

  // Efek untuk mendeteksi pergerakan peta dan menampilkan tombol reset
  useEffect(() => {
    const isMoved =
      Math.abs(viewState.longitude - defaultViewState.longitude) > 0.1 ||
      Math.abs(viewState.latitude - defaultViewState.latitude) > 0.1 ||
      Math.abs(viewState.zoom - defaultViewState.zoom) > 0.1;
    setHasMoved(isMoved);
  }, [viewState, defaultViewState]);

  useEffect(() => {
    setViewState((vs) => ({
      ...vs,
      padding: {
        ...vs.padding,
        right: mapPaddingRight,
      },
    }));
  }, [drawerOpen, mapPaddingRight]);

  return (
    <div className="relative h-screen w-full font-sans">
      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full flex flex-col justify-center transform transition-transform duration-500 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: drawerWidth }}
      >
        <div className="relative flex h-full flex-col p-4 bg-white/90 backdrop-blur-md rounded-l-2xl shadow-2xl border-l border-gray-200">
          <div className="absolute mt-20 right-5 left-0 -ml-12 md:-ml-10">
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className="mt-10 p-4 bg-white hover:bg-white text-white rounded-full shadow-lg transition-all duration-300 transform -translate-x-1/2"
              aria-expanded={drawerOpen}
              aria-controls="filter-drawer"
              type="button"
            >
              <IconFilter
                className={`w-7 h-7 transform transition-transform duration-300 ${
                  drawerOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
          <FilterDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            selectedCity={selectedCity}
            setSelectedCity={handleSetSelectedCity}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showColor={showColor}
            setShowColor={setShowColor}
            activeColors={activeColors}
            toggleColor={toggleColor}
            filteredNews={filteredNews}
            onNewsClick={(news) => {
              setPopupInfo({ ...news });
              setHighlightedCity(news.city);
              flyToLocation(news.lng, news.lat);
              setDrawerOpen(false);
            }}
            mapZoom={viewState.zoom}
            defaultZoom={defaultZoom}
            resetMap={resetMap}
          />
        </div>
      </div>

      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        {hasMoved && (
          <button
            onClick={resetMap}
            className="p-2 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 flex items-center gap-1"
            type="button"
            aria-label="Reset Map"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.564 1 1 0 11-1.887.674A5.002 5.002 0 005.999 7H8a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm0 9a1 1 0 011-1h4a1 1 0 010 2H5a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M13 14h3v-2.101a7.002 7.002 0 01-11.601-2.564 1 1 0 111.887-.674A5.002 5.002 0 0014 13v-2h2a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1z" />
            </svg>
            <span className="hidden md:inline">Reset Map</span>
          </button>
        )}
        <button
          onClick={() => setDrawerOpen((v) => !v)}
          className="p-2 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-expanded={drawerOpen}
          aria-controls="filter-drawer"
          type="button"
          aria-label="Toggle Filter"
        >
          <IconFilter className="w-5 h-5" />
        </button>
      </div>

      {/* Map */}
      <MapGL
        {...viewState}
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoibGVvbWFudXJ1bmciLCJhIjoiY21kd3g0bjM5MHdlbjJqcHpmajQ2dXIzdiJ9.a9eVU2MMRj9xSl3l9hb0JA"
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
      >
        {geoData && (
          <Source id="choropleth" type="geojson" data={geoData}>
            <Layer
              {...choroplethLayer}
              paint={{
                ...choroplethLayer.paint,
                'fill-color': showColor
                  ? (buildFillColor(activeColors, allCityMentions, highlightedCity, selectedCategory) as any)
                  : '#00000',
              }}
            />
          </Source>
        )}

        {/* Marker mengikuti warna filter */}
        {filteredNews.map((news) => {
          const count = allCityMentions[news.city];
          const colorStep = colorData.find((step) => count >= step.minMentions && count <= step.maxMentions);
          const markerColor = colorStep ? colorStep.color : '#3b82f6';

          return (
            <Marker key={news.id} longitude={news.lng} latitude={news.lat}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupInfo({ ...news });
                  setHighlightedCity(news.city);
                }}
                className="relative cursor-pointer rounded-full border-2 border-white transition-transform duration-200 hover:scale-125 focus:scale-125 focus:outline-none"
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: markerColor,
                }}
                aria-label={news.title}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPopupInfo({ ...news });
                    setHighlightedCity(news.city);
                  }
                }}
              >
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: markerColor }}
                ></span>
              </div>
            </Marker>
          );
        })}

        {/* Popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            anchor="bottom"
            closeOnClick={false}
            closeButton={false}
            onClose={() => setPopupInfo(null)}
            className="custom-popup"
          >
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden font-sans max-w-xs">
              <button
                onClick={() => setPopupInfo(null)}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-3">
                <strong className="block mb-2 text-base leading-tight font-bold text-gray-900 break-words">
                  {popupInfo.title || popupInfo.name}
                </strong>
                {popupInfo.imageUrl && (
                  <img
                    src={popupInfo.imageUrl}
                    alt={popupInfo.title || popupInfo.name || 'Image'}
                    className="mb-2 w-full h-auto object-cover rounded-md"
                  />
                )}
                <div className="mb-1 text-sm text-gray-700">
                  <span className="font-semibold">Kota:</span> {popupInfo.city || popupInfo.name}
                </div>
                <div className="mb-1 text-sm text-gray-700">
                  <span className="font-semibold">Kategori:</span> {popupInfo.category}
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold">Tanggal:</span> {formatDate(popupInfo.date)}
                </div>
                {popupInfo.mentions !== undefined && (
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Mentions:</span> {popupInfo.mentions}
                  </div>
                )}
              </div>
            </div>
          </Popup>
        )}
      </MapGL>
    </div>
  );
}
