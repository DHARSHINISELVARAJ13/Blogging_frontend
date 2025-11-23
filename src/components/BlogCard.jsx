import React from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { _id, title, description, category, image, createdAt, author, authorName, likeCount, viewCount, isLiked } = blog;

  // Clean HTML from description for preview
  const cleanDescription = description?.replace(/<[^>]*>/g, '') || '';

  // Construct full image URL if needed
  const getImageUrl = (imgPath) => {
    if (!imgPath) return '/placeholder-image.jpg';
    if (imgPath.startsWith('http')) return imgPath; // Already a full URL
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
    return imgPath.startsWith('/') ? `${baseUrl}${imgPath}` : `${baseUrl}/${imgPath}`;
  };

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <img 
          src={getImageUrl(image)} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {cleanDescription.slice(0, 120)}...
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{authorName || author?.name || 'Anonymous'}</span>
          <span>{Moment(createdAt).fromNow()}</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>{likeCount || 0}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span>{viewCount || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
