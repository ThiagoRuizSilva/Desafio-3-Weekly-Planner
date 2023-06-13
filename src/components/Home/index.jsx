import Not from "../../assets/image 2.svg";
import Logo from "../../assets/logo.svg";
import "./index.css";

export default function Home() {
  return (
    <div className="container">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="container__image">
        <img src={Not} />
      </div>
    </div>
  );
}
