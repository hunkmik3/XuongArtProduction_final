module.exports = ({ env }) => {
  // Chỉ sử dụng Cloudinary nếu có đầy đủ thông tin
  if (env('CLOUDINARY_NAME') && env('CLOUDINARY_KEY') && env('CLOUDINARY_SECRET')) {
    return {
      upload: {
        config: {
          provider: 'cloudinary',
          providerOptions: {
            cloud_name: env('CLOUDINARY_NAME'),
            api_key: env('CLOUDINARY_KEY'),
            api_secret: env('CLOUDINARY_SECRET'),
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
    };
  }
  
  // Sử dụng local upload nếu không có Cloudinary
  return {};
};
