import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../services/api';
import { useFetch } from '../hooks';
import { formatTanggal, getGenderIcon, getGenerasiLabel, hitungUmur } from '../utils/helpers';
import { LoadingSkeleton, ErrorAlert, Modal } from '../components/UI';
import { UserForm } from '../components/UserForm';

/**
 * User Detail Page
 */
export const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, loading, error, refetch } = useFetch(() => userAPI.getUserById(id));
  const [showEditModal, setShowEditModal] = useState(false);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorAlert message={error} />;
  if (!user) return <div className="text-center py-12">User tidak ditemukan</div>;

  const handleUpdateUser = async (formData) => {
    try {
      await userAPI.updateUser(id, formData);
      setShowEditModal(false);
      refetch();
    } catch (err) {
      alert('Gagal update user: ' + err.message);
    }
  };

  const handleDeleteUser = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus?')) return;
    try {
      await userAPI.deleteUser(id);
      navigate('/');
    } catch (err) {
      alert('Gagal hapus user: ' + err.message);
    }
  };

  const relasi = user.relasi || {};

  return (
    <div>
      {/* Back Button */}
      <Link to="/" className="btn btn-secondary mb-6 inline-block">
        ← Kembali
      </Link>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <div className="card sticky top-4">
            {/* Photo */}
            <div className="w-full h-64 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 overflow-hidden">
              {user.photoUrl ? (
                <img src={user.photoUrl} alt={user.namaDepan} className="w-full h-full object-cover" />
              ) : (
                <span className="text-8xl">{getGenderIcon(user.gender)}</span>
              )}
            </div>

            {/* Info */}
            <h1 className="text-2xl font-bold text-dark">
              {user.namaDepan} {user.namaBelakang}
            </h1>

            <div className="mt-4 space-y-2 text-sm">
              <p><span className="font-semibold">Gender:</span> {user.gender}</p>
              <p><span className="font-semibold">Generasi:</span> {getGenerasiLabel(user.generasi)}</p>
              {user.umur && (
                <p><span className="font-semibold">Umur:</span> {user.umur} tahun</p>
              )}
              {user.wafat && (
                <p className="text-red-600"><span className="font-semibold">Status:</span> Telah Wafat</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="w-full btn btn-primary"
              >
                Edit Profil
              </button>
              <button
                onClick={handleDeleteUser}
                className="w-full btn btn-danger"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-dark mb-4">📋 Informasi Pribadi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tanggal Lahir</p>
                <p className="font-semibold">{formatTanggal(user.tanggalLahir) || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tempat Lahir</p>
                <p className="font-semibold">{user.tempatLahir || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pekerjaan</p>
                <p className="font-semibold">{user.pekerjaan || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Alamat</p>
                <p className="font-semibold">{user.alamat || '-'}</p>
              </div>
            </div>
          </div>

          {/* Marital Info */}
          <div className="card">
            <h2 className="text-xl font-bold text-dark mb-4">💒 Status Pernikahan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold">{user.menikah ? 'Menikah' : 'Belum Menikah'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tanggal Menikah</p>
                <p className="font-semibold">{formatTanggal(user.tanggalMenikah) || '-'}</p>
              </div>
            </div>
          </div>

          {/* Family Relations */}
          <div className="card">
            <h2 className="text-xl font-bold text-dark mb-4">👨‍👩‍👧‍👦 Hubungan Keluarga</h2>

            {/* Pasangan */}
            {relasi.pasangan && (
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">💕 Pasangan</p>
                <Link
                  to={`/user/${relasi.pasangan.id}`}
                  className="text-primary font-semibold hover:underline"
                >
                  {relasi.pasangan.namaDepan} {relasi.pasangan.namaBelakang}
                </Link>
              </div>
            )}

            {/* Parents */}
            {(relasi.ayah || relasi.ibu) && (
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">👨‍👩 Orang Tua</p>
                <div className="space-y-2">
                  {relasi.ayah && (
                    <Link
                      to={`/user/${relasi.ayah.id}`}
                      className="block text-primary font-semibold hover:underline"
                    >
                      👨 {relasi.ayah.namaDepan} {relasi.ayah.namaBelakang} (Ayah)
                    </Link>
                  )}
                  {relasi.ibu && (
                    <Link
                      to={`/user/${relasi.ibu.id}`}
                      className="block text-primary font-semibold hover:underline"
                    >
                      👩 {relasi.ibu.namaDepan} {relasi.ibu.namaBelakang} (Ibu)
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Children */}
            {relasi.anak && relasi.anak.length > 0 && (
              <div className="mb-4 pb-4 border-b">
                <p className="text-sm text-gray-600 mb-2">👨‍👧‍👦 Anak ({relasi.anak.length})</p>
                <div className="space-y-2">
                  {relasi.anak.map((anak) => (
                    <Link
                      key={anak.id}
                      to={`/user/${anak.id}`}
                      className="block text-primary font-semibold hover:underline"
                    >
                      {getGenderIcon(anak.gender)} {anak.namaDepan} {anak.namaBelakang}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Siblings */}
            {relasi.saudara && relasi.saudara.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">👯 Saudara ({relasi.saudara.length})</p>
                <div className="space-y-2">
                  {relasi.saudara.map((saudara) => (
                    <Link
                      key={saudara.id}
                      to={`/user/${saudara.id}`}
                      className="block text-primary font-semibold hover:underline"
                    >
                      {getGenderIcon(saudara.gender)} {saudara.namaDepan} {saudara.namaBelakang}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        title="Edit Profil"
        onClose={() => setShowEditModal(false)}
      >
        <UserForm
          initialValues={user}
          onSubmit={handleUpdateUser}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default UserDetailPage;
