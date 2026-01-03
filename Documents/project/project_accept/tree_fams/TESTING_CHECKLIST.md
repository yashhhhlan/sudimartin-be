# 🧪 Migration & Testing Checklist

## ✅ Pre-Launch Verification

### Database Setup

- [ ] MySQL server is running
- [ ] `.env` file has correct DB credentials (root/root1234 or your custom)
- [ ] Run `npm run migrate` in backend folder
- [ ] Verify tables created: `families`, `family_members`, `relationships`
- [ ] Default admin user exists: `admin@family.com`

### Backend Setup

- [ ] Backend dependencies installed: `npm install`
- [ ] `.env` file configured with:
  - [ ] `DB_HOST=localhost`
  - [ ] `DB_USER=root`
  - [ ] `DB_PASSWORD=root1234`
  - [ ] `DB_NAME=tree_family_db`
  - [ ] `PORT=5200`
- [ ] Server starts without errors: `npm start`
- [ ] Health check works: `curl http://localhost:5200/api/health`

### Frontend Setup

- [ ] Frontend dependencies installed: `npm install`
- [ ] `.env` file configured with:
  - [ ] `REACT_APP_API_URL=http://localhost:5200`
- [ ] Frontend starts without errors: `npm start`
- [ ] App loads in browser: `http://localhost:3000`

---

## 🔐 Authentication Testing

### Login Flow

- [ ] Navigate to `/login`
- [ ] Login with:
  - Email: `admin@family.com`
  - Password: `admin123`
- [ ] JWT token stored in localStorage
- [ ] Redirected to home page
- [ ] Authorization header includes Bearer token in API calls

### Protected Routes

- [ ] Non-logged users redirected to login
- [ ] Non-admin users cannot access `/families`
- [ ] Non-admin users cannot access `/admin`
- [ ] Token validation works on API calls

---

## 👨‍👩‍👧‍👦 Family Management Testing

### Create Family

- [ ] Navigate to `/families`
- [ ] Click "Buat Keluarga Baru"
- [ ] Fill form:
  - [ ] `nama_keluarga`: "Keluarga Uji Coba"
  - [ ] `deskripsi`: "Test family tree"
  - [ ] `privacy_type`: Select PRIVATE
- [ ] Click "Buat Keluarga"
- [ ] Success message appears
- [ ] New family card appears in list

### List Families

- [ ] Dashboard shows all families owned by admin
- [ ] Family cards display:
  - [ ] Family name
  - [ ] Description (if exists)
  - [ ] Privacy badge (🔒 Privat / 🌍 Publik)
  - [ ] Edit & Delete buttons
- [ ] Public families marked correctly

### Edit Family

- [ ] Click Edit on a family card
- [ ] Canvas editor loads
- [ ] Family name displays in header
- [ ] Sidebar shows member count

### Delete Family

- [ ] Click Delete button
- [ ] Confirmation modal appears
- [ ] Cancel works (returns to list)
- [ ] Confirm deletion removes family
- [ ] Family no longer in list

---

## 👤 Member Management Testing

### Add Member

- [ ] In family editor, click "Add Member"
- [ ] Form opens with fields:
  - [ ] `nama_depan` (required)
  - [ ] `nama_belakang` (optional)
  - [ ] `gender` (Pria/Wanita)
  - [ ] `generation` (0-3)
- [ ] Submit creates member
- [ ] Member count updates
- [ ] Form closes

### View Members

- [ ] Members appear as nodes on canvas
- [ ] Nodes display initials (first + last name first letter)
- [ ] Generation marker shows below node
- [ ] Status indicator color coded (green=alive, gray=deceased)

### Edit Member

- [ ] Click on member node
- [ ] "Edit Member" button appears
- [ ] Edit form opens with all fields:
  - [ ] Personal: name, gender, status
  - [ ] Birth: date, location
  - [ ] Contact: phone, email, address
  - [ ] Professional: job, biography, photo
- [ ] Update values
- [ ] Click "Simpan Perubahan"
- [ ] Modal closes
- [ ] Changes persist (reload page)

### Delete Member

- [ ] Select member
- [ ] Should have delete option (via Edit form)
- [ ] Confirmation appears
- [ ] Member removed from canvas
- [ ] Relationships cleaned up

---

## 🔗 Relationship Testing (Backend Ready, Frontend Partial)

### Create Relationship (via API)

```bash
curl -X POST http://localhost:5200/api/families/{familyId}/relationships \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "member1_id": 1,
    "member2_id": 2,
    "relationship_type": "parent",
    "direction": "father"
  }'
```

- [ ] Relationship created in database
- [ ] Retrieve via GET /api/families/{id}/relationships
- [ ] Relationship types: parent, spouse, sibling, child, custom

### Connector Visualization (Canvas)

- [ ] Relationships appear as curved lines between nodes
- [ ] Auto-generated relationships are gray
- [ ] Custom connectors are red
- [ ] Lines update when nodes are repositioned

---

## 🎨 Canvas Controls Testing

### Pan (Right-click drag)

- [ ] Right-click and drag moves viewport
- [ ] Canvas position updates smoothly

### Zoom

- [ ] Scroll wheel up = zoom in (scale up to 5x)
- [ ] Scroll wheel down = zoom out (scale down to 0.2x)
- [ ] Zoom buttons work (if implemented)

### Reset View

- [ ] Click reset button returns to 1:1 scale
- [ ] Pan resets to (0, 0)

### Selection

- [ ] Click on node highlights it (blue border)
- [ ] Only one node selected at a time
- [ ] Click empty space deselects

### Hover Effects

- [ ] Hover over node shows tooltip
- [ ] Tooltip displays:
  - [ ] Profile photo or avatar
  - [ ] Full name
  - [ ] Generation level
  - [ ] Status badge
  - [ ] Contact info (if available)
  - [ ] Job title (if available)
  - [ ] Biography excerpt (if available)

---

## 📡 API Endpoint Testing

### Families Endpoints

```bash
# Create family
POST /api/families
Authorization: Bearer {token}
Body: { nama_keluarga, deskripsi, privacy_type }
Expected: 201, { success: true, data: { id, ... } }

# List families
GET /api/families
Authorization: Bearer {token}
Expected: 200, { success: true, data: [...] }

# Get specific family
GET /api/families/{id}
Authorization: Bearer {token}
Expected: 200, { success: true, data: { ... } }

# Update family
PUT /api/families/{id}
Authorization: Bearer {token}
Body: { privacy_type, photo_url, ... }
Expected: 200, { success: true, data: { ... } }

# Delete family
DELETE /api/families/{id}
Authorization: Bearer {token}
Expected: 200, { success: true }
```

### Members Endpoints

```bash
# Add member
POST /api/families/{id}/members
Expected: 201, { success: true, data: { ... } }

# List members
GET /api/families/{id}/members
Expected: 200, { success: true, data: [...] }

# Update member
PUT /api/families/{id}/members/{memberId}
Expected: 200, { success: true, data: { ... } }

# Delete member
DELETE /api/families/{id}/members/{memberId}
Expected: 200, { success: true }
```

### Relationships Endpoints

```bash
# Create relationship
POST /api/families/{id}/relationships
Expected: 201, { success: true, data: { ... } }

# List relationships
GET /api/families/{id}/relationships
Expected: 200, { success: true, data: [...] }

# Update relationship
PUT /api/families/{id}/relationships/{relId}
Expected: 200, { success: true, data: { ... } }

# Delete relationship
DELETE /api/families/{id}/relationships/{relId}
Expected: 200, { success: true }
```

---

## 🔒 Privacy & Authorization Testing

### Public Family Access

- [ ] Non-admin users can view public families
- [ ] Non-admin users cannot edit public families
- [ ] Public family data returned via GET endpoint

### Private Family Access

- [ ] Admin sees only their families
- [ ] Non-admin users get 403 Forbidden
- [ ] Private family members only visible to admin

### Admin-Only Operations

- [ ] Regular users cannot create families (401)
- [ ] Regular users cannot modify families (403)
- [ ] Only admin can delete families

---

## 🎨 UI/UX Testing

### Responsive Design

- [ ] Desktop view (1920px): Layout looks good
- [ ] Tablet view (768px): Elements responsive
- [ ] Mobile view (375px): Still functional (canvas may be limited)

### Form Validation

- [ ] Required fields cannot be empty
- [ ] Email validation works
- [ ] Phone number validation (optional)
- [ ] Date picker works correctly
- [ ] Error messages display clearly

### Loading States

- [ ] Loading spinners appear during async operations
- [ ] Buttons disabled while processing
- [ ] Success/error messages appear

### Error Handling

- [ ] Network error shows user-friendly message
- [ ] Invalid data shows validation error
- [ ] 404 errors handled gracefully
- [ ] 403 forbidden shows permission denied

### Visual Hierarchy

- [ ] Headers clearly indicate current section
- [ ] Buttons clearly indicate primary/secondary actions
- [ ] Color coding for status (alive/deceased)
- [ ] Icons meaningful and consistent

---

## 📊 Performance Testing

### Load Testing

- [ ] Add 20+ members to a family
- [ ] Canvas still responsive
- [ ] No visual lag when dragging nodes
- [ ] Relationships render without delay

### API Response Time

- [ ] Family creation < 500ms
- [ ] Member list fetch < 300ms
- [ ] Relationship save < 500ms

### Browser DevTools

- [ ] No console errors
- [ ] No console warnings
- [ ] Network tab shows reasonable response sizes
- [ ] No memory leaks (check with DevTools)

---

## 🔄 Data Persistence Testing

### Save Member Changes

- [ ] Edit member information
- [ ] Reload page
- [ ] Changes persist

### Node Positioning

- [ ] Drag node to new position
- [ ] Save triggered
- [ ] Reload page
- [ ] Node remains in new position

### Create Relationships

- [ ] Create relationship
- [ ] Reload page
- [ ] Relationship still exists

---

## 🐛 Known Limitations (Acceptable for Current Release)

- [ ] Photo upload: Implemented (accepts URL)
- [ ] Photo display in canvas: Not yet (placeholder circles)
- [ ] Drag-to-position nodes: Framework ready, needs completion
- [ ] Drag-to-connect relationships: Framework ready, needs completion
- [ ] Mobile canvas interaction: Limited (better on desktop)
- [ ] Export to PDF: Not yet implemented
- [ ] Import from JSON: Not yet implemented

---

## 📋 Final Verification

### Before Handoff

- [ ] All database tables created
- [ ] Default admin user created
- [ ] All API endpoints tested
- [ ] All frontend components render
- [ ] No console errors
- [ ] No unhandled promises
- [ ] Documentation complete
- [ ] QUICK_START.md instructions work
- [ ] IMPLEMENTATION_GUIDE.md accurate

### Sign-Off

- [ ] Backend: ✅ Fully tested and working
- [ ] Frontend: ✅ Fully tested and working
- [ ] Database: ✅ Schema complete and data persists
- [ ] API: ✅ All endpoints functional with auth
- [ ] UI/UX: ✅ Responsive and intuitive
- [ ] Documentation: ✅ Comprehensive

---

## 🎯 Recommended Testing Order

1. **Database** → Verify tables created correctly
2. **Backend** → Test API endpoints with curl
3. **Login** → Verify authentication flow
4. **Family Management** → Create, edit, delete families
5. **Member Management** → Add, edit, delete members
6. **Canvas** → Verify visualization and controls
7. **Relationships** → Test via API (UI implementation pending)
8. **Error Handling** → Test edge cases
9. **Performance** → Load test with multiple members
10. **Documentation** → Verify QUICK_START works

---

## 💡 Troubleshooting During Testing

### API Returns 401 Unauthorized

```
→ Token may have expired
→ Check localStorage for auth token
→ Clear cookies and login again
```

### Canvas Not Rendering

```
→ Check browser console for JavaScript errors
→ Verify family ID in URL is valid
→ Ensure members have been fetched (check API response)
```

### Members Not Loading

```
→ Check API response for members endpoint
→ Verify familyId in URL matches existing family
→ Check authorization (must be family admin)
```

### Form Submissions Fail

```
→ Check network tab for 400 Bad Request
→ Verify all required fields filled
→ Check error message for field-specific issues
```

---

## ✨ Success Criteria

Once all items are checked, the implementation is **ready for use**!

Users can:

- ✅ Create multiple family trees with privacy controls
- ✅ Add rich member data (contact, biography, photos)
- ✅ Visualize family trees on interactive canvas
- ✅ Manage relationships between members
- ✅ Edit member details with comprehensive form
- ✅ View quick info via hover tooltips
- ✅ Pan and zoom the canvas for navigation
- ✅ Secure access with role-based permissions

**Happy family tree building! 🎉**

---

**Last Updated**: January 2025  
**Version**: 2.0 - Canvas Editor
