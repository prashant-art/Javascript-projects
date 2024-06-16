let time = document.getElementById("time");
let dateInput = document.getElementById("alarmDate");
let timeInput = document.getElementById("alarmTime");
let btn = document.getElementById("setAlarm");
let contain = document.getElementById("alarms");
let interVal;
let maxValue = 3;
let count = 0;
let almTimesArray = [];
function timeChangeFunction() {
	let current = new Date();
	let hrs = current.getHours();
	let min = String(current.getMinutes()).padStart(2, "0");
	let sec = String(current.getSeconds()).padStart(2, "0");
	let period = "AM";
	if (hrs >= 12) {
		period = "PM";
		if (hrs > 12) {
			hrs -= 12;
		}
	}
	hrs = String(hrs).padStart(2, "0");
	time.textContent = `${hrs}:${min}:${sec} ${period}`;
}
function alarmSetFunction() {
	let now = new Date();
	let selectedDate = new Date(dateInput.value + "T" + timeInput.value);
	if (selectedDate <= now) {
		alert(`Invalid time. Please select 
	a future date and time.`);
		return;
	}
	if (almTimesArray.includes(selectedDate.toString())) {
		alert(`You cannot set multiple 
	alarms for the same time.`);
		return;
	}
	if (count < maxValue) {
		let timeUntilAlarm = selectedDate - now;
		let alarmDiv = document.createElement("div");
		alarmDiv.classList.add("alarm");
		alarmDiv.innerHTML = `
			<span>
			${selectedDate.toLocaleString()}
			</span>
			<button class="delete-alarm">
			Delete
			</button>
		`;
		alarmDiv
			.querySelector(".delete-alarm")
			.addEventListener("click", () => {
				alarmDiv.remove();
				count--;
				clearTimeout(interVal);
				const idx = almTimesArray.indexOf(selectedDate.toString());
				if (idx !== -1) {
					almTimesArray.splice(idx, 1);
				}
			});
		interVal = setTimeout(() => {
			alert("Time to wake up!");
			alarmDiv.remove();
			count--;
			const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
			if (alarmIndex !== -1) {
				almTimesArray.splice(alarmIndex, 1);
			}
		}, timeUntilAlarm);
		contain.appendChild(alarmDiv);
		count++;
		almTimesArray.push(selectedDate.toString());
	} else {
		alert("You can only set a maximum of 3 alarms.");
	}
}
function showAlarmFunction() {
	let alarms = contain.querySelectorAll(".alarm");
	alarms.forEach((alarm) => {
		let deleteButton = alarm.querySelector(".delete-alarm");
		deleteButton.addEventListener("click", () => {
			alarmDiv.remove();
			count--;
			clearTimeout(interVal);
			const alarmIndex = almTimesArray.indexOf(selectedDate.toString());
			if (alarmIndex !== -1) {
				almTimesArray.splice(alarmIndex, 1);
			}
		});
	});
}
showAlarmFunction();
setInterval(timeChangeFunction, 1000);
btn.addEventListener("click", alarmSetFunction);
timeChangeFunction();
