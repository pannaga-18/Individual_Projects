import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, orderBy ,query } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDezPFMNhP2YqG1yUvBe9u5dvr3c_I1OBY",
  authDomain: "arcade-mania-1989b.firebaseapp.com",
  projectId: "arcade-mania-1989b",
  storageBucket: "arcade-mania-1989b.appspot.com",
  messagingSenderId: "277264065840",
  appId: "1:277264065840:web:5f731240716075b280d4f5",
  measurementId: "G-KSBTRNRT94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data to set in Firestore


// Event listener for button click
document.getElementById('btn2').addEventListener('click', async () => {
  let current_session_players = [];
  try {

    let player1_name = document.getElementById("p1_name").value;
    current_session_players.push(player1_name);
    let player2_name = document.getElementById("p2_name").value;

    current_session_players.push(player2_name);

    for (let p_name of current_session_players) {
      let userSnapshot = await getDoc(doc(db, "LeaderBoard", p_name));
      if (!userSnapshot.exists()) {
        let lref = doc(db, "LeaderBoard", p_name);

        await setDoc(lref, {
          player_name: p_name,
          total_played: 0,
          total_won: 0,
          total_loss: 0,
          win_percentage: 0.0,
          Rank: 0
        })
      }
    }
  } catch (error) {
    console.error("Error creating document: ", error);
  }
});


async function get_leaderBoard() {
  try {
    // Reference to the LeaderBoard collection
    let ref = query(collection(db, "LeaderBoard"), orderBy('win_percentage', 'desc'));

    // Fetching documents from the collection
    let querySnapShot = await getDocs(ref);
    const reservationsTable = document.getElementById('reservationsTable');
    const reservationsTableBody = document.getElementById('reservationsTableBody');

    // Clear the table body
    reservationsTableBody.innerHTML = '';

    // Initialize a Set to collect unique keys for headers (correct field names)
    let keysSet = new Set(['player_name', 'total_played', 'total_won', 'total_loss', 'win_percentage']);

    let hasUsers = false;

    // Check if there are any documents in the collection
    if (querySnapShot.docs.length > 0) {
      hasUsers = true;

      // Iterate through documents
      querySnapShot.docs.forEach(doc => {
        let user_data = doc.data();

        // Log user data for debugging
        console.log('Document data:', user_data);

      });
    }

    // Handle case with no users
    if (!hasUsers) {
      reservationsTableBody.innerHTML = '<tr><td colspan="5">No leaderboard data found.</td></tr>';
      return;
    }

    // Create table headers
    const tableHeaderRow = document.createElement('tr');
    const rankHeader = document.createElement('th');
    rankHeader.textContent = 'Rank';  // Add Rank column header
    tableHeaderRow.appendChild(rankHeader);

    // Append other headers from keysSet
    keysSet.forEach(key => {
      const headerCell = document.createElement('th');
      headerCell.textContent = key.replace('_', ' ');  // Replace underscores with spaces for display
      tableHeaderRow.appendChild(headerCell);
    });

    // Clear previous headers and append new headers
    const thead = reservationsTable.querySelector('thead');
    if (thead) {
      thead.innerHTML = ''; // Clear previous headers
      thead.appendChild(tableHeaderRow);
    }

    let rank = 1;
    // Populate table rows
    querySnapShot.docs.forEach(doc => {
      let user_data = doc.data();
      const row = document.createElement('tr');

      // Add Rank as the first column
      const rankCell = document.createElement('td');
      rankCell.textContent = rank;
      row.appendChild(rankCell);

      // Add other columns based on keysSet
      keysSet.forEach(key => {
        const cell = document.createElement('td');
        cell.textContent = user_data[key] !== undefined ? user_data[key] : '';  // Handle undefined fields
        row.appendChild(cell);
      });

      reservationsTableBody.appendChild(row);
      rank++;
    });

  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
}

// on load
document.addEventListener('DOMContentLoaded', async () => {
  get_leaderBoard();
});







// on load
document.addEventListener('DOMContentLoaded', async () => {
  get_leaderBoard();
});


document.getElementById("btn5").addEventListener("click", () => {
  const leaderboardSection = document.getElementById("centered-section");
  const btnText = document.getElementById("btn5");

  // Check if the leaderboard section is currently visible
  if (leaderboardSection.style.display === "none" || leaderboardSection.style.display === "") {
      // If hidden, show the section and update button text
      leaderboardSection.style.display = "flex";
      btnText.innerText = "Close LeaderBoard";
  } else {
      // If visible, hide the section and update button text
      leaderboardSection.style.display = "none";
      btnText.innerText = "Show LeaderBoard";
  }
});


export async function update_leaderboard(winner_name, loser_name, flag) {

  let players_list = [];
  players_list.push(winner_name);
  players_list.push(loser_name);

  try {
    // flag = 1 for player 1
    if (flag == 1) {
      console.log("Inside flag 1 = winner_name",winner_name);
      // Reference to the winner's document
      let winnerRef = doc(db, "LeaderBoard", winner_name);
      let winnerSnapshot = await getDoc(winnerRef);
      if (winnerSnapshot.exists()) {
        let winnerData = winnerSnapshot.data();
        let total_played = winnerData.total_played + 1;
        let total_won = winnerData.total_won + 1;
        let win_percentage = (total_won / total_played) * 100.0;

        console.log(`Win percentage for ${winner_name}: ${win_percentage.toFixed(2)}%`);
        console.log("Win", winner_name);

        // Update the winner's data in Firestore
        await setDoc(winnerRef, {
          total_played: total_played,
          total_won: total_won,
          win_percentage: win_percentage
        }, { merge: true });

      }
        // Reference to the losser's document
      let losserRef = doc(db, "LeaderBoard", loser_name);
      console.log("Inside flag 1 loser_name = ",loser_name);
      let losserrSnapshot = await getDoc(losserRef);
      if (losserrSnapshot.exists()) {
        let losserData = losserrSnapshot.data();
        let total_played = losserData.total_played + 1;
        let total_won = losserData.total_won;
        let win_percentage = (total_won / total_played) * 100.0;
        let total_loss = losserData.total_loss + 1;

        console.log(`Win percentage for ${loser_name}: ${win_percentage.toFixed(2)}%`);
        console.log("Win", loser_name);

        // Update the winner's data in Firestore
        await setDoc(losserRef, {
          total_played: total_played,
          total_won: total_won,
          win_percentage: win_percentage,
          total_loss: total_loss
        }, { merge: true });

      }
    }

    // flag = 2 for player 2
    if (flag == 2) {
      let winnerRef = doc(db, "LeaderBoard", winner_name);
      let winnerSnapshot = await getDoc(winnerRef);

      if (winnerSnapshot.exists()) {
        let winnerData = winnerSnapshot.data();
        let total_played = winnerData.total_played + 1;
        let total_won = winnerData.total_won + 1;
        let win_percentage = (total_won / total_played) * 100.0;

        console.log(`Win percentage for ${winner_name}: ${win_percentage.toFixed(2)}%`);
        console.log("Win", winner_name);

        // Update the winner's data in Firestore
        await setDoc(winnerRef, {
          total_played: total_played,
          total_won: total_won,
          win_percentage: win_percentage
        }, { merge: true });

      }


        // Reference to the losser's document
        let losserRef = doc(db, "LeaderBoard", loser_name);
        let losserrSnapshot = await getDoc(losserRef);
        if (losserrSnapshot.exists()) {
          let losserData = losserrSnapshot.data();
          let total_played = losserData.total_played + 1;
          let total_won = losserData.total_won;
          let win_percentage = (total_won / total_played) * 100.0;
          let total_loss = losserData.total_loss + 1;
  
          console.log(`Win percentage for ${loser_name}: ${win_percentage.toFixed(2)}%`);
          console.log("Win", loser_name);
  
          // Update the winner's data in Firestore
          await setDoc(losserRef, {
            total_played: total_played,
            total_won: total_won,
            win_percentage: win_percentage,
            total_loss: total_loss
          }, { merge: true });
  
        }
    }

    // draw case
    if (flag == 0) {
      for (let name of players_list) {
        let winnerRef = doc(db, "LeaderBoard", name);
        let winnerSnapshot = await getDoc(winnerRef);

        if (winnerSnapshot.exists()) {
          let winnerData = winnerSnapshot.data();
          let total_played = winnerData.total_played + 1;
          let total_won = winnerData.total_won;
          let win_percentage = (total_won / total_played) * 100.0;

          console.log(`Win percentage for ${winner_name}: ${win_percentage.toFixed(2)}%`);
          console.log("Win", winner_name);

          // Update the winner's data in Firestore
          await setDoc(winnerRef, {
            total_played: total_played,
            total_won: total_won,
            win_percentage: win_percentage
          }, { merge: true });

        } else {
          // Handle the case where the winner document does not exist
          console.log(`No document found for ${winner_name}`);
        }
      }
    }
  } catch (error) {
    console.error("Error updating leaderboard: ", error);
  }
  finally{
    get_leaderBoard();
  }
}
