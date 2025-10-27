const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_TOKEN = 'your-admin-token-here'; // Thay bằng token admin của bạn

async function fixImageProjectPermissions() {
  try {
    console.log('🔧 Fixing Image Project permissions...');
    
    // Get current public role
    const roleResponse = await axios.get(`${STRAPI_URL}/api/users-permissions/roles`, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    const publicRole = roleResponse.data.roles.find(role => role.type === 'public');
    if (!publicRole) {
      throw new Error('Public role not found');
    }
    
    // Update permissions for image-project
    const updatedPermissions = {
      ...publicRole,
      permissions: {
        ...publicRole.permissions,
        'api::image-project.image-project': {
          controllers: {
            'image-project': {
              find: { enabled: true },
              findOne: { enabled: true }
            }
          }
        }
      }
    };
    
    await axios.put(`${STRAPI_URL}/api/users-permissions/roles/${publicRole.id}`, updatedPermissions, {
      headers: {
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Image Project permissions fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing permissions:', error.message);
    console.log('Please manually set permissions in Strapi admin panel');
  }
}

// Uncomment to run
// fixImageProjectPermissions();
