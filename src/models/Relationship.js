const pool = require("../config/database");

class Relationship {
  /**
   * Create a new relationship
   */
  static async create(relationshipData) {
    const query = `
      INSERT INTO relationships (
        family_id, member1_id, member2_id, relationship_type, direction,
        custom_label, custom_connector, connector_x1, connector_y1, connector_x2, connector_y2
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      relationshipData.family_id,
      relationshipData.member1_id,
      relationshipData.member2_id,
      relationshipData.relationship_type,
      relationshipData.direction || "both",
      relationshipData.custom_label || null,
      relationshipData.custom_connector || false,
      relationshipData.connector_x1 || null,
      relationshipData.connector_y1 || null,
      relationshipData.connector_x2 || null,
      relationshipData.connector_y2 || null,
    ];

    const [result] = await pool.execute(query, values);
    return {
      id: result.insertId,
      ...relationshipData,
      direction: relationshipData.direction || "both",
      created_at: new Date(),
    };
  }

  /**
   * Get relationship by ID
   */
  static async findById(relationshipId) {
    const query = "SELECT * FROM relationships WHERE id = ?";
    const [rows] = await pool.execute(query, [relationshipId]);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Get all relationships in a family
   */
  static async findByFamilyId(familyId) {
    const query = `
      SELECT * FROM relationships 
      WHERE family_id = ?
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId]);
    return rows;
  }

  /**
   * Get relationships for a specific member
   */
  static async findByMemberId(familyId, memberId) {
    const query = `
      SELECT * FROM relationships 
      WHERE family_id = ? AND (member1_id = ? OR member2_id = ?)
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId, memberId, memberId]);
    return rows;
  }

  /**
   * Get relationships between two members
   */
  static async findBetweenMembers(familyId, member1Id, member2Id) {
    const query = `
      SELECT * FROM relationships 
      WHERE family_id = ? AND (
        (member1_id = ? AND member2_id = ?) OR
        (member1_id = ? AND member2_id = ?)
      )
    `;
    const [rows] = await pool.execute(query, [
      familyId,
      member1Id,
      member2Id,
      member2Id,
      member1Id,
    ]);
    return rows;
  }

  /**
   * Get all relationships of a specific type
   */
  static async findByType(familyId, relationshipType) {
    const query = `
      SELECT * FROM relationships 
      WHERE family_id = ? AND relationship_type = ?
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId, relationshipType]);
    return rows;
  }

  /**
   * Get custom connector relationships (user-drawn)
   */
  static async findCustomConnectors(familyId) {
    const query = `
      SELECT * FROM relationships 
      WHERE family_id = ? AND custom_connector = true
      ORDER BY created_at ASC
    `;
    const [rows] = await pool.execute(query, [familyId]);
    return rows;
  }

  /**
   * Update relationship
   */
  static async update(relationshipId, relationshipData) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(relationshipData)) {
      if (key === "id" || key === "family_id" || key === "created_at") continue;

      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) return false;

    values.push(relationshipId);
    const query = `UPDATE relationships SET ${fields.join(
      ", "
    )}, updated_at = NOW() WHERE id = ?`;
    const [result] = await pool.execute(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Update connector coordinates for custom relationships
   */
  static async updateConnectorCoordinates(relationshipId, x1, y1, x2, y2) {
    const query = `
      UPDATE relationships 
      SET connector_x1 = ?, connector_y1 = ?, connector_x2 = ?, connector_y2 = ?, updated_at = NOW()
      WHERE id = ?
    `;
    const [result] = await pool.execute(query, [
      x1,
      y1,
      x2,
      y2,
      relationshipId,
    ]);
    return result.affectedRows > 0;
  }

  /**
   * Delete relationship
   */
  static async delete(relationshipId) {
    const query = "DELETE FROM relationships WHERE id = ?";
    const [result] = await pool.execute(query, [relationshipId]);
    return result.affectedRows > 0;
  }

  /**
   * Delete all relationships for a family
   */
  static async deleteByFamilyId(familyId) {
    const query = "DELETE FROM relationships WHERE family_id = ?";
    const [result] = await pool.execute(query, [familyId]);
    return result.affectedRows > 0;
  }

  /**
   * Get relationship count by family
   */
  static async getCountByFamily(familyId) {
    const query =
      "SELECT COUNT(*) as count FROM relationships WHERE family_id = ?";
    const [rows] = await pool.execute(query, [familyId]);
    return rows[0].count;
  }

  /**
   * Check if relationship exists between two members
   */
  static async exists(familyId, member1Id, member2Id) {
    const query = `
      SELECT COUNT(*) as count FROM relationships 
      WHERE family_id = ? AND (
        (member1_id = ? AND member2_id = ?) OR
        (member1_id = ? AND member2_id = ?)
      )
    `;
    const [rows] = await pool.execute(query, [
      familyId,
      member1Id,
      member2Id,
      member2Id,
      member1Id,
    ]);
    return rows[0].count > 0;
  }
}

module.exports = Relationship;
