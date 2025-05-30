// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typed.js
    const typed = new Typed('.typed-text', {
        strings: ['Kota Berkelanjutan', 'Ekonomi Sirkular', 'Circular City 5.0', 'Lingkungan Lebih Bersih'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Framework Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.floor(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.4 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            // Show success message (in real implementation, this would be after API call)
            alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            alert(`Terima kasih telah berlangganan newsletter kami dengan email: ${email}`);
            this.reset();
        });
    }

    // Dashboard Functionality
    initDashboard();
    initMap();
});

// Dashboard Functionality
function initDashboard() {
    // Example Chart Data
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        organicData: [30, 40, 45, 50, 49, 60, 70, 91, 80, 75, 82, 80],
        plasticData: [20, 35, 40, 45, 50, 55, 45, 35, 30, 45, 60, 70],
        paperData: [15, 20, 25, 40, 45, 50, 55, 50, 45, 40, 45, 50],
        metalData: [5, 10, 15, 20, 25, 20, 15, 10, 15, 20, 25, 30]
    };

    // Get chart container
    const chartContainer = document.getElementById('waste-chart');
    
    if (!chartContainer) return;

    // Create canvas element
    const canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);

    // Initialize Chart
    const ctx = canvas.getContext('2d');
    const wasteChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthlyData.labels,
            datasets: [
                {
                    label: 'Sampah Organik (ton)',
                    data: monthlyData.organicData,
                    borderColor: '#34A853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Sampah Plastik (ton)',
                    data: monthlyData.plasticData,
                    borderColor: '#4285F4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Sampah Kertas (ton)',
                    data: monthlyData.paperData,
                    borderColor: '#FBBC05',
                    backgroundColor: 'rgba(251, 188, 5, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Sampah Logam (ton)',
                    data: monthlyData.metalData,
                    borderColor: '#EA4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1E293B',
                    bodyColor: '#1E293B',
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' ton';
                        }
                    }
                }
            }
        }
    });

    // Period buttons event listeners
    const periodBtns = document.querySelectorAll('.period-btn');
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            periodBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateChartData(wasteChart, period);
        });
    });
}

function updateChartData(chart, period) {
    // Dummy data for different periods
    const weeklyData = {
        labels: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        organicData: [30, 35, 40, 45, 40, 50, 60],
        plasticData: [20, 25, 30, 35, 40, 35, 30],
        paperData: [15, 20, 25, 20, 15, 20, 25],
        metalData: [5, 10, 15, 10, 5, 10, 15]
    };
    
    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        organicData: [30, 40, 45, 50, 49, 60, 70, 91, 80, 75, 82, 80],
        plasticData: [20, 35, 40, 45, 50, 55, 45, 35, 30, 45, 60, 70],
        paperData: [15, 20, 25, 40, 45, 50, 55, 50, 45, 40, 45, 50],
        metalData: [5, 10, 15, 20, 25, 20, 15, 10, 15, 20, 25, 30]
    };
    
    const yearlyData = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        organicData: [450, 500, 550, 600, 700, 800],
        plasticData: [350, 400, 450, 500, 550, 600],
        paperData: [300, 350, 400, 450, 500, 550],
        metalData: [100, 150, 200, 250, 300, 350]
    };
    
    let data;
    
    switch(period) {
        case 'weekly':
            data = weeklyData;
            break;
        case 'monthly':
            data = monthlyData;
            break;
        case 'yearly':
            data = yearlyData;
            break;
        default:
            data = monthlyData;
    }
    
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.organicData;
    chart.data.datasets[1].data = data.plasticData;
    chart.data.datasets[2].data = data.paperData;
    chart.data.datasets[3].data = data.metalData;
    
    chart.update();
}

// Smart Bins Map Functionality
function initMap() {
    const mapContainer = document.getElementById('smart-bins-map');
    
    if (!mapContainer) return;
    
    // Sample bin data
    const bins = [
        { id: 1, lat: -6.2115, lng: 106.8452, type: 'organic', fillLevel: 75, lastEmptied: '2025-04-30', address: 'Jl. Sudirman No. 123' },
        { id: 2, lat: -6.2135, lng: 106.8472, type: 'plastic', fillLevel: 30, lastEmptied: '2025-05-01', address: 'Jl. Thamrin No. 45' },
        { id: 3, lat: -6.2155, lng: 106.8482, type: 'paper', fillLevel: 90, lastEmptied: '2025-04-29', address: 'Jl. Gatot Subroto No. 67' },
        { id: 4, lat: -6.2175, lng: 106.8462, type: 'metal', fillLevel: 45, lastEmptied: '2025-04-30', address: 'Jl. Rasuna Said No. 89' },
        { id: 5, lat: -6.2195, lng: 106.8442, type: 'organic', fillLevel: 85, lastEmptied: '2025-04-28', address: 'Jl. Kuningan No. 34' },
        { id: 6, lat: -6.2215, lng: 106.8422, type: 'plastic', fillLevel: 20, lastEmptied: '2025-05-01', address: 'Jl. Casablanca No. 56' },
        { id: 7, lat: -6.2235, lng: 106.8402, type: 'paper', fillLevel: 60, lastEmptied: '2025-04-29', address: 'Jl. Satrio No. 78' },
        { id: 8, lat: -6.2255, lng: 106.8382, type: 'metal', fillLevel: 25, lastEmptied: '2025-05-01', address: 'Jl. Prof. Dr. Satrio No. 90' },
        { id: 9, lat: -6.2275, lng: 106.8362, type: 'organic', fillLevel: 95, lastEmptied: '2025-04-27', address: 'Jl. HR. Rasuna Said No. 12' },
        { id: 10, lat: -6.2295, lng: 106.8342, type: 'plastic', fillLevel: 50, lastEmptied: '2025-04-30', address: 'Jl. Jenderal Sudirman No. 45' }
    ];
    
    // Initialize map
    const map = L.map(mapContainer).setView([-6.2155, 106.8452], 14);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Custom markers based on bin type and fill level
    const getMarkerIcon = (type, fillLevel) => {
        let color;
        
        // Color based on fill level
        if (fillLevel < 40) {
            color = '#34A853'; // Green
        } else if (fillLevel < 75) {
            color = '#FBBC05'; // Yellow
        } else {
            color = '#EA4335'; // Red
        }
        
        let iconClass;
        // Icon based on bin type
        switch(type) {
            case 'organic':
                iconClass = 'fa-apple-core';
                break;
            case 'plastic':
                iconClass = 'fa-bottle-water';
                break;
            case 'paper':
                iconClass = 'fa-newspaper';
                break;
            case 'metal':
                iconClass = 'fa-can-food';
                break;
            default:
                iconClass = 'fa-trash';
        }
        
        return L.divIcon({
            html: `<div class="bin-marker" style="background-color: ${color}"><i class="fas ${iconClass}"></i></div>`,
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
    };
    
    // Add markers for each bin
    bins.forEach(bin => {
        const marker = L.marker([bin.lat, bin.lng], {
            icon: getMarkerIcon(bin.type, bin.fillLevel)
        }).addTo(map);
        
        marker.bindPopup(`
            <div class="bin-popup">
                <h3>Tempat Sampah #${bin.id}</h3>
                <p><strong>Jenis:</strong> ${bin.type}</p>
                <p><strong>Level Isi:</strong> ${bin.fillLevel}%</p>
                <p><strong>Alamat:</strong> ${bin.address}</p>
                <p><strong>Terakhir Dikosongkan:</strong> ${bin.lastEmptied}</p>
                <button class="btn btn-primary btn-sm" onclick="showBinDetails(${bin.id})">Detail</button>
            </div>
        `);
    });
    
    // Filter checkboxes event listeners
    const filterCheckboxes = document.querySelectorAll('.map-filter input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const type = this.getAttribute('data-type');
            filterBins(type, this.checked);
        });
    });
    
    // Function to filter bins by type
    function filterBins(type, show) {
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                const binType = layer.getPopup().getContent().match(/Jenis:<\/strong> (\w+)<\/p>/)[1];
                
                if (binType === type) {
                    if (show) {
                        layer.addTo(map);
                    } else {
                        map.removeLayer(layer);
                    }
                }
            }
        });
    }
    
    // Add custom CSS for bin markers
    const style = document.createElement('style');
    style.innerHTML = `
        .bin-marker {
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 0 50%;
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        
        .bin-marker i {
            transform: rotate(-45deg);
            color: white;
            font-size: 16px;
        }
        
        .bin-popup {
            min-width: 200px;
        }
        
        .bin-popup h3 {
            font-size: 16px;
            margin-bottom: 10px;
        }
        
        .bin-popup p {
            margin: 5px 0;
            font-size: 14px;
        }
        
        .btn-sm {
            padding: 5px 10px;
            font-size: 12px;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);
}

// Function to show bin details in modal
function showBinDetails(binId) {
    // Sample bin data (in a real app, this would be fetched from an API)
    const bins = [
        { 
            id: 1, 
            type: 'organic', 
            fillLevel: 75, 
            lastEmptied: '2025-04-30', 
            address: 'Jl. Sudirman No. 123', 
            capacity: '100L',
            weight: '75kg',
            temp: '28°C',
            humidity: '65%',
            batteryLevel: '85%',
            history: [
                { date: '2025-04-30', time: '08:30', fillLevel: '0%', status: 'empty', operator: 'Ahmad' },
                { date: '2025-04-29', time: '17:45', fillLevel: '90%', status: 'full', operator: 'N/A' },
                { date: '2025-04-28', time: '08:15', fillLevel: '0%', status: 'empty', operator: 'Budi' },
                { date: '2025-04-27', time: '18:00', fillLevel: '85%', status: 'full', operator: 'N/A' },
                { date: '2025-04-26', time: '09:00', fillLevel: '0%', status: 'empty', operator: 'Ahmad' }
            ]
        },
        // Add more bin data here for other IDs
    ];
    
    // Find bin data based on ID
    const bin = bins.find(b => b.id === binId) || bins[0]; // Default to first bin if not found
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close"><i class="fas fa-times"></i></span>
            <div class="bin-details">
                <div class="bin-image">
                    <img src="/api/placeholder/400/300" alt="Smart Bin #${bin.id}">
                </div>
                <div class="bin-info">
                    <h3>Detail Tempat Sampah #${bin.id}</h3>
                    <div class="bin-stats">
                        <div class="bin-stat ${bin.fillLevel < 40 ? 'green' : bin.fillLevel < 75 ? 'yellow' : 'red'}">
                            <h4>Level Isi</h4>
                            <p>${bin.fillLevel}%</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Jenis</h4>
                            <p>${bin.type}</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Kapasitas</h4>
                            <p>${bin.capacity}</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Berat</h4>
                            <p>${bin.weight}</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Temperatur</h4>
                            <p>${bin.temp}</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Kelembaban</h4>
                            <p>${bin.humidity}</p>
                        </div>
                        <div class="bin-stat">
                            <h4>Baterai</h4>
                            <p>${bin.batteryLevel}</p>
                        </div>
                    </div>
                    <div class="bin-actions">
                        <a href="#" class="btn btn-primary">Jadwalkan Pengumpulan</a>
                        <a href="#" class="btn btn-outline">Lihat di Peta</a>
                    </div>
                    <div class="bin-history">
                        <h4>Riwayat Pengumpulan</h4>
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Waktu</th>
                                    <th>Level Isi</th>
                                    <th>Status</th>
                                    <th>Operator</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bin.history.map(record => `
                                    <tr>
                                        <td>${record.date}</td>
                                        <td>${record.time}</td>
                                        <td>${record.fillLevel}</td>
                                        <td><span class="status ${record.status === 'empty' ? 'empty' : 'full'}">${record.status}</span></td>
                                        <td>${record.operator}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal on click outside or on close button
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Initialize dashboard data 
function initDashboardData() {
    // Update dashboard cards with real-time data (simulated here)
    
    // Current date
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const dateDisplay = document.getElementById('current-date');
    if (dateDisplay) {
        dateDisplay.textContent = formattedDate;
    }
    
    // Dashboard card data
    const dashboardData = [
        {
            id: 'total-bins',
            title: 'Total Tempat Sampah',
            value: 568,
            growth: 12.5,
            icon: 'fa-trash'
        },
        {
            id: 'active-bins',
            title: 'Tempat Sampah Aktif',
            value: 542,
            growth: 8.3,
            icon: 'fa-check-circle'
        },
        {
            id: 'waste-collected',
            title: 'Sampah Terkumpul',
            value: '35.8 ton',
            growth: 15.2,
            icon: 'fa-truck'
        },
        {
            id: 'recycling-rate',
            title: 'Tingkat Daur Ulang',
            value: '42%',
            growth: 9.7,
            icon: 'fa-recycle'
        },
        {
            id: 'sensors-active',
            title: 'Sensor Aktif',
            value: 1245,
            growth: 10.3,
            icon: 'fa-wifi'
        },
        {
            id: 'co2-reduction',
            title: 'Pengurangan CO₂',
            value: '12.5 ton',
            growth: 22.8,
            icon: 'fa-leaf'
        }
    ];
    
    // Update each dashboard card
    dashboardData.forEach(item => {
        const cardElement = document.getElementById(item.id);
        if (cardElement) {
            const valueEl = cardElement.querySelector('.dashboard-card-value');
            const growthEl = cardElement.querySelector('.dashboard-card-growth');
            const iconEl = cardElement.querySelector('.icon i');
            
            if (valueEl) valueEl.textContent = item.value;
            if (growthEl) growthEl.textContent = `+${item.growth}% dari bulan lalu`;
            if (iconEl) iconEl.className = `fas ${item.icon}`;
        }
    });
    
    // Schedule regular updates
    setInterval(updateRealtimeData, 5000);
}

// Simulate real-time data updates
function updateRealtimeData() {
    // Get all smart bins status
    const bins = document.querySelectorAll('.bin-status');
    
    bins.forEach(bin => {
        // Randomly update fill level
        const fillLevel = parseInt(bin.getAttribute('data-fill')) + Math.floor(Math.random() * 5);
        bin.setAttribute('data-fill', Math.min(fillLevel, 100));
        
        // Update progress bar
        const progressBar = bin.querySelector('.fill-bar .progress');
        if (progressBar) {
            progressBar.style.width = `${fillLevel}%`;
            
            // Update color based on fill level
            if (fillLevel < 40) {
                progressBar.style.backgroundColor = '#34A853';
            } else if (fillLevel < 75) {
                progressBar.style.backgroundColor = '#FBBC05';
            } else {
                progressBar.style.backgroundColor = '#EA4335';
            }
        }
        
        // Update percentage display
        const percentText = bin.querySelector('.fill-text');
        if (percentText) {
            percentText.textContent = `${fillLevel}%`;
        }
    });
    
    // Update newly collected waste
    const wasteCollected = document.getElementById('waste-collected');
    if (wasteCollected) {
        const valueEl = wasteCollected.querySelector('.dashboard-card-value');
        if (valueEl) {
            // Extract current value and add a small random amount
            const currentValue = parseFloat(valueEl.textContent);
            const newValue = (currentValue + (Math.random() * 0.2)).toFixed(1);
            valueEl.textContent = `${newValue} ton`;
        }
    }
}

// Add a notification system
function initNotifications() {
    // Create notification container if not exists
    let notifContainer = document.querySelector('.notification-container');
    
    if (!notifContainer) {
        notifContainer = document.createElement('div');
        notifContainer.className = 'notification-container';
        document.body.appendChild(notifContainer);
        
        // Add CSS for notifications
        const style = document.createElement('style');
        style.innerHTML = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .notification {
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 15px 20px;
                min-width: 300px;
                max-width: 400px;
                display: flex;
                align-items: flex-start;
                gap: 15px;
                transform: translateX(120%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .notification-icon.warning {
                background-color: #FFF5E5;
                color: #FBBC05;
            }
            
            .notification-icon.info {
                background-color: #E8F0FE;
                color: #4285F4;
            }
            
            .notification-icon.success {
                background-color: #E6F7E9;
                color: #34A853;
            }
            
            .notification-icon.error {
                background-color: #FEEDEC;
                color: #EA4335;
            }
            
            .notification-content {
                flex-grow: 1;
            }
            
            .notification-title {
                font-weight: 600;
                margin-bottom: 5px;
            }
            
            .notification-message {
                font-size: 14px;
                color: #94A3B8;
            }
            
            .notification-close {
                color: #94A3B8;
                cursor: pointer;
                transition: color 0.3s;
            }
            
            .notification-close:hover {
                color: #EA4335;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Simulate notifications
    setTimeout(() => {
        showNotification('info', 'Pembaruan Sistem', 'Sistem Smart Waste Management telah diperbarui ke versi 2.5.0');
    }, 5000);
    
    setTimeout(() => {
        showNotification('warning', 'Peringatan Tempat Sampah Penuh', 'Tempat sampah di Jl. Sudirman No. 123 hampir penuh (90%)');
    }, 10000);
    
    setTimeout(() => {
        showNotification('success', 'Pengumpulan Berhasil', 'Sampah dari 15 tempat sampah berhasil dikumpulkan hari ini');
    }, 15000);
}

// Function to show notifications
function showNotification(type, title, message) {
    const container = document.querySelector('.notification-container');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon ${type}">
            <i class="fas ${type === 'info' ? 'fa-info' : type === 'warning' ? 'fa-exclamation' : type === 'success' ? 'fa-check' : 'fa-times'}"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode === container) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode === container) {
                    container.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Initialize all functionalities
window.addEventListener('load', function() {
    initDashboardData();
    initNotifications();
});