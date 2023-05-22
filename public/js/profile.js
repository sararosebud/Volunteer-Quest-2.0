const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#event-name').value.trim();
  const description = document.querySelector('#event-desc').value.trim();
  const event_date = document.querySelector('#event-date').value.trim();

  if (name && description && event_date) {
    const response = await fetch(`/api/event`, {
      method: 'POST',
      body: JSON.stringify({ name, description, event_date }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert("Ayyyy event created");
      document.location.replace('/profile');
    } else {
      alert('Failed to create event');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const event_id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/event/${event_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete event');
    }
  }
};

document
  .querySelector('.new-event-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.event-list')
  .addEventListener('click', delButtonHandler);
