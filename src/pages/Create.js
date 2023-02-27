import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import Form from "react-bootstrap/Form";
import "./Create.css";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const [accessToken, setAccessToken] = useState("data");
  const [album, setAlbum] = useState(null);
  const [params, setParams] = useSearchParams();

  const CLIENT_ID = "0474c79b015843b9b4e9a4b67cbe80c7";
  const CLIENT_SECRET = "f5aa899ec05f4ce6bcee4753337bca46";

  //Spotify Token
  useEffect(() => {
    var tellFetch = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", tellFetch)
      .then((result) => result.json())
      .then((data) => { setAccessToken(data.access_token); getAlbum() });
  }, []);

  // //Arist id
  async function getAlbum() {
    var searchPara = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + accessToken,
      },
    };

    await fetch(
      "https://api.spotify.com/v1/album/" + params.get('id'),
      searchPara
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbum(data);
        console.log(searchPara) // Shows authorization
      });
  }

  const createComment = async (e) => {
    e.preventDefault()
    if (!method || !rating) { // (!title || !method || !rating) // Disable first entry!
      setFormError('Please fill in all fields')
      return;
    }

    const { data, error } = await supabase
      .from('music')
      .insert([{ title, method, rating }])
      .select()

    if (error) {
      setFormError('Please fill in all fields')
    }
    if (data) {
      setFormError(null)
      navigate("/")
    }
  };

  return (
    <div className='Img'>
      <div className="page-create">
        <Form onSubmit={createComment}>
          <Form.Group id="title" className="mb-3">
            <label htmlFor="title">Name</label>
            <input
              type="image"
              id="title" // image?
              src="album.image[0].url" // ******* string? *******
              alt="Album Photo"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <label htmlFor="method">Comment</label>
            <textarea
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </Form.Group>

          <button>Comment</button>
          {formError && <p className='error'>{formError}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Create;