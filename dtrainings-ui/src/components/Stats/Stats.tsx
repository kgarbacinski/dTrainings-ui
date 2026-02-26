import React from 'react';
import './Stats.scss';
import { useGetTrainingsForUser } from "../../hooks/queries/useGetTrainings";
import { useAccount } from "wagmi";
import Navbar from "../Navbar/Navbar";
import NetworkGuard from "../common/NetworkGuard";

const Stats = () => {
    const { address } = useAccount();
    const { data: trainings = [], isLoading, isError, error } = useGetTrainingsForUser([address]);

    const totalTrainings = trainings.length;
    const totalMinutes = trainings.reduce((sum, t) => sum + Number(t.durationInMinutes), 0);
    const averageMinutes = totalTrainings > 0 ? Math.round(totalMinutes / totalTrainings) : 0;

    const longestTraining = trainings.reduce<{ name: string; duration: number } | null>((longest, t) => {
        const dur = Number(t.durationInMinutes);
        if (!longest || dur > longest.duration) {
            return { name: t.name, duration: dur };
        }
        return longest;
    }, null);

    const recentTrainings = [...trainings]
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, 5);

    if (isLoading) return (
        <div className="stats-page">
            <Navbar />
            <div className="stats-loading">
                <div className="stats-spinner" />
                <p>Loading stats...</p>
            </div>
        </div>
    );

    if (isError) return (
        <div className="stats-page">
            <Navbar />
            <div className="stats-error">
                <p>Failed to load stats</p>
                <p className="stats-error__message">{error.message}</p>
            </div>
        </div>
    );

    return (
        <div className="stats-page">
            <Navbar />

            <NetworkGuard>
                <div className="stats-container">
                    <h1 className="stats-title">Your Stats</h1>

                    {totalTrainings === 0 ? (
                        <div className="stats-empty">
                            <div className="stats-empty__icon">&#x1F4CA;</div>
                            <h2>No data yet</h2>
                            <p>Start logging trainings to see your statistics here.</p>
                        </div>
                    ) : (
                        <>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span className="stat-card__label">Total Trainings</span>
                                    <span className="stat-card__value">{totalTrainings}</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-card__label">Total Time</span>
                                    <span className="stat-card__value">{totalMinutes} min</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-card__label">Average Duration</span>
                                    <span className="stat-card__value">{averageMinutes} min</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-card__label">Longest Training</span>
                                    <span className="stat-card__value">{longestTraining?.duration} min</span>
                                    <span className="stat-card__sub">{longestTraining?.name}</span>
                                </div>
                            </div>

                            <div className="stats-recent">
                                <h2 className="stats-recent__title">Recent Trainings</h2>
                                <div className="stats-recent__list">
                                    {recentTrainings.map((training, index) => (
                                        <div key={index} className="stats-recent__item">
                                            <span className="stats-recent__name">{training.name}</span>
                                            <div className="stats-recent__meta">
                                                {training.createdAt > BigInt(0) && (
                                                    <span className="stats-recent__date">
                                                        {new Date(Number(training.createdAt) * 1000).toLocaleDateString()}
                                                    </span>
                                                )}
                                                <span className="stats-recent__duration">
                                                    {training.durationInMinutes.toString()} min
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </NetworkGuard>
        </div>
    );
};

export default Stats;
