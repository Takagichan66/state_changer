document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const stateDisplay = document.getElementById('stateDisplay');
    const userIdInput = document.getElementById('userId');

    // Function to fetch and display the current state of the specified user
    function fetchState(userId) {
        fetch(`http://localhost:3000/toggle-state/${userId}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                stateDisplay.textContent = `State: ${data.state}`;
                toggleButton.textContent = `Turn ${data.state === 'on' ? 'Off' : 'On'}`;
            })
            .catch(error => console.error('Error fetching state:', error));
    }

    // Add event listener to the button to toggle the state for the specified user
    toggleButton.addEventListener('click', () => {
        const userId = userIdInput.value;
        if (!userId) {
            alert('Please enter a user ID.');
            return;
        }

        fetch(`http://localhost:3000/toggle-state/${userId}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                stateDisplay.textContent = `State: ${data.state}`;
                toggleButton.textContent = `Turn ${data.state === 'on' ? 'Off' : 'On'}`;
            })
            .catch(error => console.error('Error toggling state:', error));
    });

    // Fetch the initial state for a default user ID
    // Uncomment the line below and provide a default user ID if needed
    // fetchState('20240808-1');
});
