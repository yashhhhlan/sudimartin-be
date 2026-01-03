# 🔧 Pro Family Tree Components - Developer Implementation Guide

## 📋 Daftar Isi

1. [Setup & Installation](#setup--installation)
2. [File Structure](#file-structure)
3. [Data Preparation](#data-preparation)
4. [Integration Steps](#integration-steps)
5. [API Endpoint Setup](#api-endpoint-setup)
6. [Testing & Debugging](#testing--debugging)
7. [Deployment](#deployment)

---

## 🚀 Setup & Installation

### Step 1: Verify Dependencies

```bash
cd fe
npm list react react-router-dom lucide-react
```

Expected output:

```
├── react@18.x.x
├── react-router-dom@6.x.x
└── lucide-react@0.x.x
```

If missing:

```bash
npm install react@18 react-router-dom@6 lucide-react
```

### Step 2: Verify Tailwind CSS

```bash
# Check if tailwind.config.js exists
ls -la tailwind.config.js postcss.config.js

# Check if CSS is imported in main.jsx
grep -n "import.*css" src/main.jsx
```

Expected in `src/main.jsx`:

```javascript
import "./styles/index.css";
```

### Step 3: Verify Tailwind Configuration

Ensure `tailwind.config.js` includes:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // ← Important!
  ],
  // ... rest of config
};
```

---

## 📁 File Structure

### Current Structure

```
fe/src/
├── components/
│   ├── ProFamilyTreeVisualization.jsx    ← NEW
│   ├── ProFamilyTreeCard.jsx             ← NEW
│   ├── FamilyMemberAvatar.jsx            ← NEW
│   ├── USAGE_EXAMPLES.jsx                ← NEW (optional)
│   ├── TEST_DATA.js                      ← NEW (for testing)
│   ├── index.js                          ← UPDATED
│   ├── FamilyTreeVisualization.jsx       ← OLD (can keep for fallback)
│   ├── FamilyTreeNode.jsx                ← OLD (can keep for fallback)
│   └── ... (other components)
├── pages/
│   ├── FamilyDashboard.jsx               ← UPDATE THIS
│   └── ... (other pages)
├── styles/
│   └── index.css
└── main.jsx
```

### New Files to Add

- ✅ `ProFamilyTreeVisualization.jsx` - Main visualization
- ✅ `ProFamilyTreeCard.jsx` - Member card
- ✅ `FamilyMemberAvatar.jsx` - Avatar component
- ✅ `index.js` - Barrel exports (UPDATED)
- ✅ `TEST_DATA.js` - Test scenarios (optional)

---

## 📊 Data Preparation

### Before Integration: Audit Current Data

```bash
# Check API response structure
curl http://localhost:5000/api/members | jq '.[0]'
```

Expected response:

```json
{
  "id": 1,
  "nama_depan": "Ahmad",
  "nama_belakang": "Hassan",
  "gender": "M",
  "status_hidup": "Hidup",
  "status_menikah": "Menikah",
  "generation": 1,
  "photo_url": null,
  "tanggal_lahir": "1970-01-15",
  "ayah_id": null,
  "ibu_id": null,
  "partners": [{ "spouseId": 2, "children": [{ "id": 3 }, { "id": 4 }] }]
}
```

### Data Migration Helper

Jika data lama tidak punya `partners` array:

```javascript
// In api.js atau utils
export async function migrateDataFormat(members) {
  return members.map((member) => {
    if (member.partners) {
      return member; // Already new format
    }

    // Transform old format to new
    const spouses = members.filter(
      (m) =>
        m.generation === member.generation &&
        m.status_menikah === "Menikah" &&
        m.id !== member.id
    );

    return {
      ...member,
      partners: spouses.map((spouse) => ({
        spouseId: spouse.id,
        children: members
          .filter(
            (m) =>
              (m.ayah_id === member.id && m.ibu_id === spouse.id) ||
              (m.ayah_id === spouse.id && m.ibu_id === member.id)
          )
          .map((c) => ({ id: c.id })),
      })),
    };
  });
}
```

---

## 🔌 Integration Steps

### Step 1: Update FamilyDashboard.jsx

**Before:**

```jsx
import FamilyTreeVisualization from "../components/FamilyTreeVisualization";

function FamilyDashboard() {
  const [members, setMembers] = useState([]);

  return (
    <FamilyTreeVisualization
      members={members}
      onEdit={handleEdit}
      // ...
    />
  );
}
```

**After:**

```jsx
import ProFamilyTreeVisualization from "../components/ProFamilyTreeVisualization";

function FamilyDashboard() {
  const [members, setMembers] = useState([]);

  return (
    <ProFamilyTreeVisualization
      members={members}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAddSpouse={handleAddSpouse}
      onAddChild={handleAddChild}
    />
  );
}
```

### Step 2: Implement Event Handlers

```jsx
const handleEdit = async (member) => {
  navigate(`/member/${member.id}/edit`);
};

const handleDelete = async (member) => {
  if (window.confirm(`Yakin hapus ${member.nama_depan}?`)) {
    try {
      const response = await fetch(`/api/members/${member.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setMembers(members.filter((m) => m.id !== member.id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

const handleAddSpouse = (member) => {
  sessionStorage.setItem(
    "addRelationTo",
    JSON.stringify({
      parentId: member.id,
      type: "pasangan",
    })
  );
  navigate("/add-member");
};

const handleAddChild = (member) => {
  sessionStorage.setItem(
    "addRelationTo",
    JSON.stringify({
      parentId: member.id,
      type: "anak",
    })
  );
  navigate("/add-member");
};
```

### Step 3: Update Services/API

```javascript
// services/api.js
export async function fetchMembers(familyId) {
  const response = await fetch(`/api/families/${familyId}/members`);
  if (!response.ok) throw new Error("Failed to fetch");
  return response.json();
}

export async function deleteMember(memberId) {
  const response = await fetch(`/api/members/${memberId}`, {
    method: "DELETE",
  });
  return response.ok;
}
```

---

## 🎯 Success Criteria

✅ Components display correctly
✅ All 4 action buttons work
✅ Multi-spouse layout renders
✅ Connector lines show
✅ Mobile responsive
✅ No console errors

---

**Ready to implement?** Start with copying the 3 component files!
