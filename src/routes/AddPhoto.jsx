import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: Date().toString(),
      updatedAt: Date().toString(),
      secret: secret,
    }
    e.preventDefault();
    if(secret === "password"){
      fetch("https://gallery-app-server.vercel.app/photos",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(() => {
        console.log("masuk sini")
        navigate("/photos")
      }).then(()=> console.log("masuk sana"))
    } else {
      setError("You are not authorized")
    }
    console.log(secret === "password")
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
