import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb'
import { Spinner } from "react-bootstrap"
import storage from "../Config/firebaseConfig"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import './profile.css';

function WishListForm() {
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [values, setValues] = useState({
        name: "",
        category: "",
        subcategory: "",
        price: 0.0,
        desc: "",
        imageUrl: "",
        user: globalData.currentUser,
        owner: globalData.currentUser.username,
        swap: false,
        buy: false,
    });
    const [loading, setLoading] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function handleFileChanges(event) {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!file) {
            toast.error("Please upload an image first, and press on Upload Button!", { position: 'bottom-right' });
        }
        const timestamp = Date.now(); // get the current timestamp
        const imageName = `${timestamp}_${file.name}`; // concatenate the timestamp and file name to create a unique image name
        const storageRef = ref(storage, `/files/${imageName}`);
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((imageUrl) => {
                    console.log(imageUrl);
                    // setValues({ ...values, imageUrl: url });
                    setImageUploaded(true);
                    toast.success('Image was uploaded Successfully', {
                        position: 'bottom-right'
                    })
                    const category = values.category + "-" + values.subcategory;
                    const { name, price, desc, user, owner, swap, buy } = values;

                    const config = {
                        headers: {
                            Authorization: `Bearer ${globalData.Token}`
                        }
                    }

                    axios.post('/api/auth/addToNeedList', {
                        name,
                        category,
                        price,
                        desc,
                        imageUrl,
                        user,
                        owner,
                        swap,
                        buy
                    }, config)
                        .then(data => {
                            if (data.data.status) {
                                globalData.currentUser = data.data.currentUser;
                                localStorage.setItem('user12345', JSON.stringify(globalData));
                                navigate(`/${data.data.currentUser._id}/wish-list`);
                                window.location.reload();
                                window.location.reload();
                            } else {
                                toast.error("Something went wrong please reload the page, and make sure your internet connection is good.", {
                                    position: 'bottom-right'
                                });
                            }
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                            toast.error(err.error.message, {
                                position: 'bottom-right'
                            });
                        });

                });
            }
        );
    }

    const categories = ["", "Arts & Crafts", "Books", "Collectibles & Memorabilia", "Electronics", "Furniture", "Video Games"];
    const Furniture = ["", "Sofas & armchairs", "Coffee & side tables", "TV & media furniture", "Bookcases", "Chairs", "Tables & desks", "Outdoor furniture", "Beds & mattresses", "Wardrobes & bedroom storage", "Dressers & storage drawers", "Closet organizers", "Cabinets & display cabinets", "Kitchen islands & carts", "Kitchen cabinets & fronts", "Kitchen interior organizers", "Cookware & tableware", "Kitchen faucets & sinks", "Bathroom furniture & accessories", "Laundry & cleaning", "Home decor", "Lighting", "Textiles & rugs", "Curtains & blinds", "Baby & children's products", "Storage furniture", "Pet furniture", "Office furniture", "Swedish food market", "Restaurant & bar furniture", "Holiday decoration", "Smart home", "Furniture sets", "New lower price"];
    const Electronics = ["", "Televisions", "Home Theater Systems", "Audio & HiFi", "Headphones", "Speakers", "Streaming Devices", "Gaming Consoles", "Computers & Laptops", "Monitors", "Printers", "Tablets & eReaders", "Smartphones", "Smart Home Devices", "Cameras & Camcorders", "Drones", "Wearable Technology", "Cables & Adapters", "Batteries & Chargers", "Gadgets & Other Electronics"];
    const Games = ["", "Action", "Adventure", "Role-Playing", "Sports", "Simulation", "Strategy", "Horror", "Puzzle", "Racing", "Fighting", "Shooter", "Music & Dance", "Family & Kids", "Party & Mini Games", "Virtual Reality", "DLC & Expansion Packs", "Pre-orders", "New Releases", "Best Sellers", "PlayStation Plus Games", "Exclusive Titles", "PlayStation Hits", "Digital Games", "Physical Games"];
    const Books = ["", "Fiction", "Mystery & Thrillers", "Romance", "Science Fiction & Fantasy", "Horror", "Literature & Fiction", "Children's Books", "Biographies & Memoirs", "History", "Politics & Social Sciences", "Science & Math", "Business & Money", "Self-Help", "Cookbooks and Food", "Art, Music & Photography", "Travel", "Sports & Outdoors", "Crafts, Hobbies & Home", "Christian Books & Bibles", "Islamic Books", "Judaism Books", "Other Religious Books", "Foreign Language Books", "Educational & Reference Books", "Comics & Graphic Novels", "Calendars", "Audio Books", "Rare & Collectible Books"];
    const CandBs = ["", "Sports Memorabilia", "Entertainment Memorabilia", "Historical Memorabilia", "Political Memorabilia", "Advertising Collectibles", "Antique & Vintage Collectibles", "Coins & Currency", "Stamps", "Toys & Hobbies", "Comic Books", "Postcards & Paper", "Artifacts & Primitive Art", "Autographs", "Military Memorabilia", "Transportation Collectibles", "Science & Technology Collectibles", "Space Memorabilia", "Religious & Spiritual Collectibles", "Militaria", "Breweriana", "Disney Collectibles", "Sports Trading Cards", "Non-Sports Trading Cards", "Knives, Swords & Blades", "Patches & Pins", "Music Memorabilia", "Celebrities Memorabilia", "Firefighting Memorabilia", "Police Memorabilia", "Sewing Collectibles", "Dolls & Bears", "Other Collectibles"];
    const Arts = ["", "Painting", "Drawing", "Calligraphy", "Printmaking", "Sculpture", "Ceramics & Pottery", "Glass Art", "Textile Art", "Knitting & Crochet", "Sewing & Quilting", "Embroidery", "Needlepoint", "Cross-Stitch", "Weaving", "Jewelry Making", "Beadwork & Beading", "Paper Crafts", "Origami", "Scrapbooking", "Collage & Decoupage", "Woodworking", "Metalworking", "Leatherworking", "Soap & Candle Making", "Floral Design", "Mosaics", "Modeling & Miniatures", "Other Arts & Crafts"];


    return (
        <>
            <Breadcrumb type={"Add Product to WishList"} />
            <div style={{ margin: '20px' }}>
                <h4 className="mb-4 mt-0" style={{ textAlign: 'center' }} >Add to your WishList</h4>
                <form onSubmit={handleSubmit} className="file-upload">
                    <div className="row mb-5 gx-5">
                        {/* <!-- Contact detail --> */}
                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Product category *</label>
                                        <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='category' onChange={(e) => handleChange(e)}>
                                            {categories.map((category) => (<option>{category}</option>))}
                                        </select>
                                    </div>

                                    {values.category !== "" && (
                                        values.category === "Arts & Crafts" ? (
                                            <div div className="col-md-6">
                                                <label for="" className="form-label">Sub category *</label>
                                                <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                    {Arts.map((Art) => (<option>{Art}</option>))}
                                                </select>
                                            </div>
                                        ) :
                                            values.category === "Collectibles & Memorabilia" ? (
                                                <div div className="col-md-6">
                                                    <label for="" className="form-label">Sub category *</label>
                                                    <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                        {CandBs.map((CandB) => (<option>{CandB}</option>))}
                                                    </select>
                                                </div>
                                            ) :
                                                values.category === "Books" ? (
                                                    <div div className="col-md-6">
                                                        <label for="" className="form-label">Sub category *</label>
                                                        <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                            {Books.map((book) => (<option>{book}</option>))}
                                                        </select>
                                                    </div>
                                                ) :
                                                    values.category === "Furniture" ? (
                                                        <div div className="col-md-6">
                                                            <label for="" className="form-label">Sub category *</label>
                                                            <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                                {Furniture.map((furn) => (<option>{furn}</option>))}
                                                            </select>
                                                        </div>
                                                    ) : values.category === "Video Games" ? (
                                                        <div div className="col-md-6">
                                                            <label for="" className="form-label">Sub category *</label>
                                                            <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                                {Games.map((game) => (<option>{game}</option>))}
                                                            </select>
                                                        </div>
                                                    ) : values.category === "Electronics" ? (
                                                        <div div className="col-md-6">
                                                            <label for="" className="form-label">Sub category *</label>
                                                            <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='subcategory' onChange={(e) => handleChange(e)}>
                                                                {Electronics.map((Electronic) => (<option>{Electronic}</option>))}
                                                            </select>
                                                        </div>
                                                    ) : (<></>)
                                    )}

                                    <div className="col-md-6">
                                        <label className="form-label">Product Name *</label>
                                        <input type="text" className="form-control" name='name' onChange={(e) => handleChange(e)} />
                                    </div>

                                    <div class="col-md-6">
                                        <label class="form-label" >Image *</label>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                class="form-control"
                                                name='imageUrl'
                                                onChange={handleFileChanges}
                                                placeholder="Please upload your Image"
                                                required
                                            />
                                        </div>
                                        <ToastContainer />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Description *</label>
                                        <textarea className="form-control" name='desc' onChange={(e) => handleChange(e)} />
                                    </div>

                                    <input type="hidden" className="form-control" name='country' onChange={(e) => handleChange(e)} value={globalData.currentUser.username} disabled />
                                </div>
                            </div>
                            {/* <!-- button --> */}
                            <div className="text-center" style={{ margin: '20px' }}>
                                {!file ? (

                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                        disabled
                                        style={{ marginRight: '10px' }}
                                    >
                                        {loading ?
                                            <Spinner
                                                as="span"
                                                variant="light"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border" />
                                            : "Add Product"}
                                    </button>
                                ) :
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg"
                                        style={{ marginRight: '10px' }}
                                    >
                                        {loading ?
                                            <Spinner
                                                as="span"
                                                variant="light"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border" />
                                            : "Add Product"}
                                    </button>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default WishListForm