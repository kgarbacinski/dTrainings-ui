import Navbar from "../Navbar/Navbar";
import React from "react";
import {useNavigate} from "react-router-dom";
import "./Home.scss";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="home-container">
                <div className="content">
                    <p>Trainings overview</p>

                    <div className="card-grid">
                        <div className="card" onClick={() => navigate('/trainings-manager')}>
                            <strong><p>Manage Trainings</p></strong>
                            <p className="description">Onchain manager for your gym trainings manager.</p>
                            <button onClick={() => navigate('/trainings-manager')}>View</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;