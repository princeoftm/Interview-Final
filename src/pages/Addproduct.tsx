import { useState } from 'react';
import { storage, db } from './config/config'; // Importing Firebase storage and Firestore
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

const Addproduct = () => {
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Function to handle form input changes (product name, description, price)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'productName') setProductName(value);
    if (name === 'description') setDescription(value);
    if (name === 'price') setPrice(value);
  };

  // Function to handle file upload along with product info
  const handleUpload = async () => {
    if (file) {
      const storageRef = storage.child(`uploads/${file.name}`); // Creating a reference to the file in Firebase storage
      const uploadTask = storageRef.put(file); // Start file upload

      // Listen to the upload progress
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress); // Update progress state
        },
        (error) => {
          console.error('Upload failed:', error); // Handle any errors
        },
        async () => {
          // Handle successful upload and get the download URL
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log('File available at:', downloadURL);

          // Save product info and file URL to Firestore
          try {
            await addDoc(collection(db, 'products'), {
              productName,
              description,
              price,               // Include the price in the Firestore document
              imageUrl: downloadURL, // Store the file's download URL
              createdAt: new Date(), // Optional: Store the timestamp
            });
            setUploadSuccess(true);
            console.log('Product info and file uploaded successfully');
          } catch (err) {
            console.error('Error saving document:', err);
          }
        }
      );
    }
  };

  return (
    <div className="addproduct">
      <h1>Add a New Product</h1>

      {/* Input fields for product info */}
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={productName}
        onChange={handleInputChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={price}
        onChange={handleInputChange}
      />

      {/* File input */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {uploadSuccess && <p>Product and file uploaded successfully!</p>}
    </div>
  );
};

export default Addproduct;
