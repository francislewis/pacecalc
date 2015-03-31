//Calculates time (distance * pace * conversion factor)
function calcTime(form) {
	var pace = getPace(form);
	var dist = parseFloat(form.dist.value);
	var time = dist * pace * convertUnit(form);
	//Outputs to form
	form.hr.value = getHours(time);
	form.min.value = getMins(time);
	form.sec.value = getSecs(time);
}
//Calculates distance (time / (pace / conversion factor))
function calcDist(form) {
	var time = getTime(form);
	var pace = getPace(form);
	var dist = time / (pace / convertUnit(form));
	//Outputs to form
	form.dist.value = dist;

}
//Calculates pace (time / dist) / conversion factor
function calcPace(form) {
	var time = getTime(form);
	var dist = parseFloat(form.dist.value);
	var pace = (time / dist) / convertUnit(form);

	form.phr.value = getHours(pace);
	form.pmin.value = getMins(pace);
	form.psec.value = getSecs(pace);
}


//Converts time input into seconds
function getTime(form) {
	var hsecs = form.hr.value;
	if (hsecs === "") {
		hsecs = 0;
	} else {
		hsecs = parseFloat(hsecs) * 3600;
	}
	var msecs = form.min.value;
	if (msecs === "") {
		msecs = 0;
	} else {
		msecs = parseFloat(msecs) * 60;
	}
	var secs = form.sec.value;
	if (secs === "") {
		secs = 0;
	} else {
		secs = parseFloat(secs);
	}

	return hsecs + msecs + secs;
}

//Converts pace time input into seconds
function getPace(form) {
	var hsecs = form.phr.value;
	if (hsecs === "") {
		hsecs = 0;
	} else {
		hsecs = parseFloat(hsecs) * 3600;
	}
	var msecs = form.pmin.value;
	if (msecs === "") {
		msecs = 0;
	} else {
		msecs = parseFloat(msecs) * 60;
	}
	var secs = form.psec.value;
	if (secs === "") {
		secs = 0;
	} else {
		secs = parseFloat(secs);
	}
	
	return hsecs + msecs + secs;
}


//Returns conversion factor for units of distance
function convertUnit(form) {
	var paceUnit, distUnit;

	var mile = 1609.33;
	var km = 1000;

	if (form.distUnit.value == "Mile") distUnit = mile;
	if (form.distUnit.value == "Kilometer") distUnit = km;
	if (form.distUnit.value == "Meter") distUnit = 1;

	if (form.paceUnit.value == "Mile") paceUnit = mile;
	if (form.paceUnit.value == "Kilometer") paceUnit = km;
	if (form.paceUnit.value == "Meter") paceUnit = 1;
	if (form.paceUnit.value == "1500m") paceUnit = 1500;
	if (form.paceUnit.value == "800m") paceUnit = 800;
	if (form.paceUnit.value == "400m") paceUnit = 400;
	if (form.paceUnit.value == "200m") paceUnit = 200;

	return distUnit/paceUnit;
 }
//Gets # of hours in seconds
 function getHours(totalSeconds) {
  	var hrs = Math.floor(totalSeconds / 3600);
 	hrs = hrs.toString(10);
 	return hrs;
 }
//Gets # of minutes in seconds
 function getMins(totalSeconds) {
 	var mins;
 	var hrs = getHours(totalSeconds);
 	var hourSeconds = hrs * 3600;
 	var minSeconds = totalSeconds - hourSeconds;
 	mins = Math.floor(minSeconds / 60);
 	mins = mins.toString(10);
 	if (mins.length == 1) {mins = "0" + mins}

 	return mins;
 }
//Gets # of seconds
function getSecs(totalSeconds) {
	var secs;
	secs = totalSeconds - (getHours(totalSeconds)*3600) - (getMins(totalSeconds)*60);
	secs = secs.toString(10);
	if (secs.length == 1) {
		secs = "0" + secs;
	} else {
		for (var i = 0; i < secs.length; i++) {
			var tchar = secs.charAt(i);
			if (i == 1 && tchar == ".") {
				secs = "0" + secs;
				break;
			}
		}
	}
	return secs;
}