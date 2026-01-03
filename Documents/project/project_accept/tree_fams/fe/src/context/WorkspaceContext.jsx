import React, { createContext, useState, useCallback } from "react";

export const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  // Family data
  const [currentFamily, setCurrentFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [relationships, setRelationships] = useState([]);

  // Canvas state
  const [scale, setScale] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

  // Selection and editing
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [hoveredMemberId, setHoveredMemberId] = useState(null);

  // UI state
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showNodeEditForm, setShowNodeEditForm] = useState(false);
  const [drawingConnector, setDrawingConnector] = useState(null);
  const [customConnectorStart, setCustomConnectorStart] = useState(null);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper functions for canvas manipulation
  const canvasToWorldCoordinates = useCallback(
    (canvasX, canvasY) => {
      return {
        x: (canvasX - panX) / scale,
        y: (canvasY - panY) / scale,
      };
    },
    [scale, panX, panY]
  );

  const worldToCanvasCoordinates = useCallback(
    (worldX, worldY) => {
      return {
        x: worldX * scale + panX,
        y: worldY * scale + panY,
      };
    },
    [scale, panX, panY]
  );

  // Update member
  const updateMember = useCallback((memberId, updatedData) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, ...updatedData } : m))
    );
  }, []);

  // Update member position
  const updateMemberPosition = useCallback(
    (memberId, x, y) => {
      updateMember(memberId, { node_position_x: x, node_position_y: y });
    },
    [updateMember]
  );

  // Add relationship
  const addRelationship = useCallback(
    (member1Id, member2Id, relationshipType, direction = "both") => {
      const newRelationship = {
        family_id: currentFamily?.id,
        member1_id: member1Id,
        member2_id: member2Id,
        relationship_type: relationshipType,
        direction,
        custom_connector: false,
      };

      setRelationships((prev) => [...prev, newRelationship]);
    },
    [currentFamily]
  );

  // Remove relationship
  const removeRelationship = useCallback((relationshipId) => {
    setRelationships((prev) => prev.filter((r) => r.id !== relationshipId));
  }, []);

  // Add custom connector
  const addCustomConnector = useCallback(
    (member1Id, member2Id, x1, y1, x2, y2) => {
      const newConnector = {
        family_id: currentFamily?.id,
        member1_id: member1Id,
        member2_id: member2Id,
        relationship_type: "custom",
        direction: "both",
        custom_connector: true,
        custom_label: "",
        connector_x1: x1,
        connector_y1: y1,
        connector_x2: x2,
        connector_y2: y2,
      };

      setRelationships((prev) => [...prev, newConnector]);
    },
    [currentFamily]
  );

  // Get relationships for a member
  const getMemberRelationships = useCallback(
    (memberId) => {
      return relationships.filter(
        (r) => r.member1_id === memberId || r.member2_id === memberId
      );
    },
    [relationships]
  );

  // Get member by ID
  const getMemberById = useCallback(
    (memberId) => {
      return members.find((m) => m.id === memberId);
    },
    [members]
  );

  // Get connected members
  const getConnectedMembers = useCallback(
    (memberId) => {
      return relationships
        .filter((r) => r.member1_id === memberId || r.member2_id === memberId)
        .map((r) => ({
          id: r.member1_id === memberId ? r.member2_id : r.member1_id,
          relationshipType: r.relationship_type,
          direction: r.direction,
        }));
    },
    [relationships]
  );

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedMemberId(null);
  }, []);

  // Reset canvas view
  const resetCanvasView = useCallback(() => {
    setScale(1);
    setPanX(0);
    setPanY(0);
  }, []);

  // Zoom in/out
  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev * 1.2, 5));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev / 1.2, 0.2));
  }, []);

  // Pan canvas
  const panCanvas = useCallback((deltaX, deltaY) => {
    setPanX((prev) => prev + deltaX);
    setPanY((prev) => prev + deltaY);
  }, []);

  const value = {
    // Family data
    currentFamily,
    setCurrentFamily,
    members,
    setMembers,
    relationships,
    setRelationships,

    // Canvas state
    scale,
    setScale,
    panX,
    setPanX,
    panY,
    setPanY,

    // Selection and editing
    selectedMemberId,
    setSelectedMemberId,
    editingMemberId,
    setEditingMemberId,
    hoveredMemberId,
    setHoveredMemberId,

    // UI state
    showAddMemberForm,
    setShowAddMemberForm,
    showNodeEditForm,
    setShowNodeEditForm,
    drawingConnector,
    setDrawingConnector,
    customConnectorStart,
    setCustomConnectorStart,

    // Loading and error
    loading,
    setLoading,
    error,
    setError,

    // Helper functions
    canvasToWorldCoordinates,
    worldToCanvasCoordinates,
    updateMember,
    updateMemberPosition,
    addRelationship,
    removeRelationship,
    addCustomConnector,
    getMemberRelationships,
    getMemberById,
    getConnectedMembers,
    clearSelection,
    resetCanvasView,
    zoomIn,
    zoomOut,
    panCanvas,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
