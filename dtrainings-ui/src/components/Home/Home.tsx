import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Navbar />

            <section className="hero">
                <div className="hero__glow" />
                <div className="hero__content">
                    <h1 className="hero__title">
                        Track Your Training.<br />
                        <span className="hero__accent">Onchain.</span>
                    </h1>
                    <p className="hero__subtitle">
                        Decentralized training tracker powered by smart contracts.
                        Log workouts, track progress, own your data.
                    </p>
                    <button className="hero__cta" onClick={() => navigate('/trainings-manager')}>
                        Get Started
                    </button>
                </div>
            </section>

            <section className="features">
                <div className="features__grid">
                    <div
                        className="feature-card feature-card--active"
                        onClick={() => navigate('/trainings-manager')}
                    >
                        <div className="feature-card__icon">&#x1F3CB;</div>
                        <h3 className="feature-card__title">Manage Trainings</h3>
                        <p className="feature-card__description">
                            Create, view and manage your training sessions onchain.
                        </p>
                    </div>

                    <div className="feature-card feature-card--disabled">
                        <span className="feature-card__badge">Soon</span>
                        <div className="feature-card__icon">&#x1F3C6;</div>
                        <h3 className="feature-card__title">Rankings</h3>
                        <p className="feature-card__description">
                            Compare your progress with other athletes on the leaderboard.
                        </p>
                    </div>

                    <div
                        className="feature-card feature-card--active"
                        onClick={() => navigate('/stats')}
                    >
                        <div className="feature-card__icon">&#x1F4CA;</div>
                        <h3 className="feature-card__title">Your Stats</h3>
                        <p className="feature-card__description">
                            Detailed analytics and insights about your training habits.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;
