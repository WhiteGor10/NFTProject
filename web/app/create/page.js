"use client";
import { useEffect, useState } from "react";
import Link from 'next/link' 

import {handleMint, connectAccount} from "../utils.js";
export default function Search() {

    const [account, setaccount] = useState([]); 
    const [isConnected, setIsConnected] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [mediaType, setMediaType] = useState("image"); // "image" or "video"

    // Handle file selection
    const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Validate file type based on selected mediaType
        if (mediaType === 'image' && !file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }
        if (mediaType === 'video' && !file.type.startsWith('video/')) {
            alert('Please select a video file');
            return;
        }
        
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
};

    // Mint with local object URL
    const Mint = async () => {
        if (!previewUrl) {
            alert('Please select an image first');
            return;
        }
        handleMint(previewUrl);
        setSelectedFile(null);
        setPreviewUrl("");
    };



const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
};

 

    function ConnectAccount() {
        connectAccount(setaccount, setIsConnected);
    }
    
    //Run once Onopen
    useEffect(() => {
        ConnectAccount(setaccount, setIsConnected);
    }, []);

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 sticky top-0 z-50">
            {/* Enhanced Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* flex col container */}
                    <div className="flex justify-between items-center h-16">   
                        {/* Logo/Brand */}
                        <div className="flex items-center space-x-3">
                            <Link 
                                href="../"
                                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                            >
                                NFT Marketplace
                            </Link>
                        </div>

                        {/* Connection Status */}
                        <div className={`
                            flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ml-auto mr-4 ml-auto mr-4
                            ${isConnected 
                                ? "bg-green-50 border-green-200 text-green-700 shadow-sm" 
                                : "bg-gray-50 border-gray-200 text-gray-500"
                            }
                        `}>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
                            <span className="text-sm font-medium">
                                {isConnected ? "Wallet Connected" : "Not Connected"}
                            </span>
                        </div>

                        {/* Connect Button */}
                        <button 
                            onClick={ConnectAccount}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Enhanced Sidebar */}
                    <aside className="w-64">
                        <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-2 sticky top-24 sticky top-24">
                            {[
                                { href: "home", label: "Home"},
                                { href: "create", label: "Create", active: true },
                                { href: "list", label: "List"},
                                { href: "manage", label: "Manage"},
                                { href: "search", label: "Search & Buy"},
                                { href: "bidding", label: "Bidding"}
                            ].map((item,index) => (
                                <Link 
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                                        item.active 
                                            ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 font-semibold" 
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Card */}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            {/* Header Section */}
                            <div className="text-center mb-12">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span className="text-2xl text-white">✨</span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Create Your NFT
                                </h1>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Upload your image or video to create your NFT in just one step.
                                </p>
                            </div>

                            {/* Form Section */}
                            <div className="max-w-md mx-auto space-y-6">
                                {/* Media Type Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Media Type *
                                    </label>
                                    <select
                                        value={mediaType}
                                        onChange={(e) => {
                                            setMediaType(e.target.value);
                                            // Clear files when switching type
                                            setSelectedFile(null);
                                            setPreviewUrl("");
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    >
                                        <option value="image">Image NFT</option>
                                        <option value="video">Video NFT</option>
                                    </select>
                                </div>

                                {/* File Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {mediaType === 'image' ? 'NFT Image *' : 'NFT Video *'}
                                    </label>
                                    
                                    {/* File Input */}
                                    <div className="flex items-center justify-center w-full">
                                        {!previewUrl ? (
                                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-200 group">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <div className="w-12 h-12 mb-3 text-gray-400 group-hover:text-purple-500 transition-colors duration-200">
                                                        {mediaType === 'image' ? (
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                            </svg>
                                                        ) : (
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <p className="mb-2 text-sm text-gray-500 text-center">
                                                        <span className="font-semibold">Click to upload</span>
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        {mediaType === 'image' 
                                                            ? 'PNG, JPG, GIF, WEBP (Max 10MB)' 
                                                            : 'MP4, MOV, WEBM (Max 50MB)'
                                                        }
                                                    </p>
                                                </div>
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept={mediaType === 'image' ? "image/*" : "video/*"}
                                                    onChange={handleFileSelect}
                                                />
                                            </label>
                                        ) : (
                                            /* File Preview */
                                            <div className="relative w-full">
                                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            {mediaType === 'image' ? 'Selected Image' : 'Selected Video'}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={removeFile}
                                                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-lg hover:bg-red-50"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="relative">
                                                            {mediaType === 'image' ? (
                                                                <img 
                                                                    src={previewUrl} 
                                                                    alt="NFT preview" 
                                                                    className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200"
                                                                />
                                                            ) : (
                                                                <div className="relative">
                                                                    <video 
                                                                        src={previewUrl} 
                                                                        className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200"
                                                                        muted
                                                                    />
                                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                                        <div className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                                <path d="M8 5v14l11-7z"/>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {selectedFile.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • 
                                                                {mediaType === 'image' 
                                                                    ? ` ${selectedFile.type.split('/')[1].toUpperCase()}`
                                                                    : ' Video'
                                                                }
                                                            </p>
                                                            <div className="flex items-center mt-1">
                                                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                                                    mediaType === 'image' ? 'bg-green-500' : 'bg-blue-500'
                                                                }`}></div>
                                                                <p className={`text-xs font-medium ${
                                                                    mediaType === 'image' ? 'text-green-600' : 'text-blue-600'
                                                                }`}>
                                                                    {mediaType === 'image' ? 'Image Ready' : 'Video Ready'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Create Button */}
                                <button
                                    onClick={Mint}
                                    disabled={!selectedFile}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Create {mediaType === 'image' ? 'Image' : 'Video'} NFT
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}