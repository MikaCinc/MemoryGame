window.onload = function() {
	//start()
	// ovde animiramo naslov
	var s = document.getElementById('naslov').innerHTML
	var a = "> Memory Game (Scorpio):"
	var b = "< Memory Game (Scorpio)."
	var interval = setInterval (function() {
		s = a
		var timeout = setTimeout (function() {
			s = b
			document.getElementById('naslov').innerHTML = s
		}, 500)
		document.getElementById('naslov').innerHTML = s
	}, 1000)
	// ovde animiramo mikac_inc
	var ani = "mikac_inc"
	var i = 0
	var interval2 = setInterval(function() {
			document.getElementById("mikac_inc_span").appendChild(document.createTextNode(ani[i]))
			i+=1
			if(i>ani.length){
				document.getElementById("mikac_inc_span").innerHTML = ""
				i = 0
			}
	}, 500)
	// Ovde animiramo klasu .meni
	/*
	var ps = document.getElementsByClassName("meni")
	for(var c=0; c<ps.length; c++){
		var ids = ps[c].id
		var ihtmls = ps[c].innerHTML
		console.log(ihtmls)
		animate(ids, ihtmls)
	}
	*/
}

function animate(id, text){
	var s
	var a = ">" + text
	var b = "<" + text
	console.log(text)
	var interval = setInterval (function() {
		s = a
		var timeout = setTimeout (function() {
			s = b
			document.getElementById(id).innerHTML = s
		}, 500)
		document.getElementById(id).innerHTML = s
	}, 1000)

}

function random_number(num) {
	return Math.floor(Math.random()*num)
}

function pocni_ponovo() {
	if(confirm("Da li si siguran? Trenutna igra će biti resetovana") == true){
		start()
	}
}

function druga_podesavanja() {
	if(confirm("Da li si siguran? Trenutna igra će biti resetovana") == true){
		document.getElementById("igra_div").style.display = "none"
		document.getElementById("podesavanja_div").style.display = "block"
		clearInterval(vreme_interval)
	}
}

function vreme_isk_uk(){
	var opcije = document.getElementsByName("vreme_radio")
	if(opcije[0].checked == true){
		document.getElementById("vrem_ogr_input").disabled = false
	} else {
		document.getElementById("vrem_ogr_input").disabled = true
	}
}

function start() {
	// hide/show elements + reset globalnih varijabli
	document.getElementById("igra_div").style.display = "block"
	document.getElementById("podesavanja_div").style.display = "none"
	document.getElementById("br_o_parova").innerHTML = 0
	document.getElementById("br_res_parova").innerHTML = 0
	document.getElementById("tabela").innerHTML = ""
	width = 0
	open_num = 0
	document.getElementById("child_div").style.width = width + "px"
	clearInterval(vreme_interval)
	// Globalne varijable za funckiju
	var arr = []
	var broj_mnozenja_r
	var broj_mnozenja_d
	function set_table(br_mno) {
		broj_mnozenja_r = br_mno
		broj_mnozenja_d = br_mno
		var krug = 0
		while(krug < 2){
			krug += 1
			for(var xyz = 1; xyz<=broj_mnozenja_r*broj_mnozenja_d/2; xyz++){
				arr.push(xyz)
			}
		}
	}

	function set_table_different(ukupno){
		var r = random_number(10)
		var d = ukupno/r
		if(Number.isInteger(d) == true){
			broj_mnozenja_r = r
			broj_mnozenja_d = d
			var krug = 0
			while(krug < 2){
				krug += 1
				for(var xyz = 1; xyz<=broj_mnozenja_r*broj_mnozenja_d/2; xyz++){
					arr.push(xyz)
				}
			}
		} else {
			set_table_different(ukupno)
		}
	}

	if(document.getElementsByName("nivo_igre")[0].checked == true){
		if(document.querySelector("select").value == "Uvek kvadrat"){
			set_table(4)
		} else {
			set_table_different(16)
		}
	} else if (document.getElementsByName("nivo_igre")[1].checked == true){
		if(document.querySelector("select").value == "Uvek kvadrat"){
			set_table(8)
		} else {
			set_table_different(64)
		}
		
	} else if (document.getElementsByName("nivo_igre")[2].checked == true){
		if(document.querySelector("select").value == "Uvek kvadrat"){
			set_table(10)
		} else {
			set_table_different(100)
		}
	}
	var n;

	for(var r = 0; r<broj_mnozenja_r; r++){
		var tr = document.createElement("tr")
		for(var d = 0; d<broj_mnozenja_d; d++) {
			var len = arr.length
			var i = random_number(len)
			n = arr[i]
			var td = document.createElement("td")
			td.innerHTML = n
			td.className="closed"
			td.addEventListener("click", function() {
				clicked(this)
			})
			arr.splice(i, 1)
			tr.appendChild(td)
		}
		document.getElementById("tabela").appendChild(tr)
	}

	var vreme = document.getElementById("vrem_ogr_input").value
	vreme_interval = setInterval(function() {
		vreme -= 1
		document.getElementById("br_sekundi").innerHTML = vreme
		if(vreme == 0){
			alert("Vreme je isteklo, počinješ ponovo...")
			clearInterval(vreme_interval)
			start()
		}
	}, 1000)
}

var vreme_interval;
var open_num = 0;
var width = 0;

function clicked(td) {
	if(td.className == "opened" || td.className == "solved"){
		alert("Ova kartica je već otvorena")
	} else {
		var open_e = document.getElementsByClassName("opened")
		open_num += 1

		if(open_num == 3){
			document.getElementById("br_o_parova").innerHTML = parseFloat(document.getElementById("br_o_parova").innerHTML) + 1
			open_e[0].className = "closed"
			open_e[0].className = "closed"
			td.className = "opened"
			open_num = 1
		} else {
			td.className = "opened"
			if(open_num == 2){
				if (open_e[0].innerHTML == open_e[1].innerHTML) {
					open_e[0].className = "solved"
					open_e[0].className = "solved"
					open_num = 0
					// Povećavamo statistiku
					document.getElementById("br_res_parova").innerHTML = parseFloat(document.getElementById("br_res_parova").innerHTML) + 1
					document.getElementById("br_o_parova").innerHTML = parseFloat(document.getElementById("br_o_parova").innerHTML) + 1
					// Progress bar
					if(document.getElementsByName("nivo_igre")[0].checked == true){
						width += 50
						document.getElementById("child_div").style.width = width + "px"
					} else if (document.getElementsByName("nivo_igre")[1].checked == true){
						width += 12.5
						document.getElementById("child_div").style.width = width + "px"
					} else if (document.getElementsByName("nivo_igre")[2].checked == true){
						width += 8
						document.getElementById("child_div").style.width = width + "px"
					}
				}
			}
		}
	}
	var ukupno = 0;
	var tds = document.getElementsByTagName("td")
	for(var o = 0; o<tds.length; o++){
		if(tds[o].className == "solved"){
			ukupno += 1
		}
	}
	console.log(ukupno)
	if(ukupno == tds.length){
		if(confirm("Bravo, rešio si sve! Da li želiš da pokušaš ponovo?") == true){
			start()
		}
	}
}

/*
function color_change(id){
	var value = document.getElementById(id).value
	if(id=="color_closed"){
		var closed = document.getElementsByClassName("closed")
		for(var i=0; i<closed.length; i++){
			closed[i].style.setProperty('--closed', value);
		}
	}
}
*/