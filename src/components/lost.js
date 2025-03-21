import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>Dashboard</h2>
                <ul>
                    <li>Dashboard</li>
                    <li>Orders</li>
                    <li>Reports</li>
                    <li>Sales</li>
                    <li>Traffic</li>
                    <li>Integrations</li>
                </ul>
            </aside>
            <main className="main-content">
                <h1>Dashboard Overview</h1>
                <div className="grid-container">
                    <div className="grid-item full-width" style={{ height: '14px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item full-width" style={{ height: '150px' }}></div>
                    <div className="grid-item full-width" style={{ height: '14px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                    <div className="grid-item" style={{ height: '100px' }}></div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
