
    // Party registration form
    document.getElementById('party-registration-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const partyName = document.getElementById('party-name').value;
      const partyId = document.getElementById('party-id').value;
      const partyImage = document.getElementById('party-image').value;
  
      try {
        const response = await fetch('/api/party-registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ partyName, partyId, partyImage }),
        });
        const data = await response.json();
        console.log('Party registration successful:', data);
        alert('Party registered successfully!');
      } catch (error) {
        console.error('Error registering party:', error);
        alert('Error registering party. Please try again later.');
      }
    });
  
    // To Vote
    document.getElementById('voting-pallet-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const partyName = document.getElementById('voting-party').value;
      const EVId = document.getElementById('voting-ev-id').value;
      const votingId = document.getElementById('voting-id').value;
  
      try {
        const response = await fetch('/api/voting-pallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ partyName, EVId, votingId }),
        });
        const data = await response.json();
        console.log('Vote cast successfully:', data);
        alert('Vote cast successfully!');
      } catch (error) {
        console.error('Error casting vote:', error);
        alert('Error casting vote. Please try again later.');
      }
    });

  document.addEventListener('DOMContentLoaded', () => {
    // Get final results
    fetch('/api/final-results')
    //chaining
      .then(response => response.json())
      .then(results => {
        const tableBody = document.querySelector('#final-results-table tbody');
        results.forEach(result => {
          const row = tableBody.insertRow();
          row.innerHTML = `<td>${result.partyName}</td><td>${result.votingId}</td><td>${new Date(result.polledOn).toLocaleString()}</td>`;
        });
      })
      .catch(error => console.error('Error fetching final results:', error));
    });
  