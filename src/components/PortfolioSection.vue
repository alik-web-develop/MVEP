.section-title span {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
}

.portfolio-card {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.portfolio-card:hover {
    transform: translateY(-5px);
    border-color: rgba(139, 92, 246, 0.3);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
}

.portfolio-overlay {
    background: linear-gradient(to top, rgba(11, 11, 33, 0.9), rgba(139, 92, 246, 0.1));
}

.portfolio-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #8B5CF6;
    margin-bottom: 0.5rem;
}

.portfolio-category {
    color: #6D28D9;
    font-size: 0.875rem;
    font-weight: 500;
} 