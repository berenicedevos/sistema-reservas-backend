const socket = io();
const list = document.getElementById('services-list');

const renderServices = (services) => {
  list.innerHTML = '';
  if (services.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No hay servicios cargados.';
    list.appendChild(li);
    return;
  }

  services.forEach((service) => {
    const li = document.createElement('li');
    const state = service.available ? 'Disponible' : 'No disponible';
    li.textContent = `${service.name} - $${service.price} - ${service.duration} min - ${service.category} - ${state}`;
    list.appendChild(li);
  });
};

socket.on('servicesUpdated', (services) => {
  renderServices(services);
});