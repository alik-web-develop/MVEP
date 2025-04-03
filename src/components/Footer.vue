<template >
    <footer class="mt-8 border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
        <div class="container p-12 flex justify-between">
            <div class="text-white text-3xl font-bold">LOGO</div>
            <p class="text-slate-600">All rights reserved.</p>
        </div>
    </footer>
</template>

<style>
.footer {
    background: rgba(11, 11, 33, 0.8);
    border-top: 1px solid rgba(139, 92, 246, 0.2);
    backdrop-filter: blur(10px);
}

.footer-title {
    color: #8B5CF6;
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.footer-link {
    color: #94a3b8;
    transition: all 0.3s ease;
}

.footer-link:hover {
    color: #8B5CF6;
}

.social-link {
    width: 40px;
    height: 40px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8B5CF6;
    transition: all 0.3s ease;
}

.social-link:hover {
    background: linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%);
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
}

.copyright {
    color: #94a3b8;
    border-top: 1px solid rgba(139, 92, 246, 0.2);
}
</style>
