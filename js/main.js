/* Field References

(a) Capabilities for Financial Year ---- # of capabilities per year
(b) User Story/Capability ---- # of User Stories per Capability
(c) Average Cost/User Story ---- Cost per Project/Capability
(d) Cost per Capability – ( b*c) 
(e) Total Yearly Cost for Capabilities  (a*d) 
(f) % Capabilities needing UX Visualization 
(g) Cost for UX Capabilities (e*f) ---- Total amount
(h) Productivity and Cost Reduction Benefit - Clarity and Visual Requirements ---- % Productivity Benefit  
(i) Overall Benefits (g*h) ---- Value of Reduction/Benefits
(j) Capability Budget Per Month (e/12) 
(k) Average Capabilities Budget (e/a) 
(l) Value of Reduction Per Capability (i/a) 
(m) Reduction Value - % of Budget (i/e) 
(n) Value of Reduction Per Month  (i/12)

*/


var roiCalculator = function() {

	//Selectors
	var selectors = {
		roiCalcWrapper: '#roi-calculator',
		chartContainer: '#chart-container',
		aText: '.txt_a',
		bText: '.txt_b',
		cText: '.txt_c',
		dLbl: '.lbl_d',
		eLbl: '.lbl_e',
		gLbl: '.lbl_g',
		fText: '.txt_f',
		hText: '.txt_h',
		iLbl: '.lbl_i',
		jLbl: '.lbl_j',
		kLbl: '.lbl_k',
		lLbl: '.lbl_l',
		mLbl: '.lbl_m',
		nLbl: '.lbl_n',
		btnSubmit: '.btn_submit'
	};

	var init = function() {
		initializeEvents();
		renderCharts(300, 100, 0);
	};

	//Events
	var initializeEvents = function() {
		/*$(selectors.aText, selectors.roiCalcWrapper).on('keyup', aTextChange)
		$(selectors.bText, selectors.roiCalcWrapper).on('keyup', bTextChange)
		$(selectors.cText, selectors.roiCalcWrapper).on('keyup', cTextChange)
		$(selectors.fText, selectors.roiCalcWrapper).on('keyup', fTextChange)
		$(selectors.hText, selectors.roiCalcWrapper).on('keyup', hTextChange)*/
		$(selectors.btnSubmit, selectors.roiCalcWrapper).on('click', submitInputsClick)
	};

	/*Custom Validations*/
	var validateDecimal = function(evt, element) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (
			(charCode !== 45 || $(element).val().indexOf('-') !== -1) &&
			(charCode !== 46 || $(element).val().indexOf('.') !== -1) &&
			(charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	};

	var aTextChange = function() {
		console.log($(this).val());
	};

	var bTextChange = function() {
		console.log($(this).val());
	};

	var cTextChange = function() {
		console.log($(this).val());
	};

	var fTextChange = function() {
		console.log($(this).val());
	};

	var hTextChange = function() {
		console.log($(this).val());
	};
	
	var formatNumber = function(num){
		return (Number(num)/1000000).toFixed(4) + " Million"
	};

	var submitInputsClick = function() {
		//Get values
		var a = parseInt($(selectors.aText, selectors.roiCalcWrapper).val()),
			b = parseInt($(selectors.bText, selectors.roiCalcWrapper).val()),
			c = parseInt($(selectors.cText, selectors.roiCalcWrapper).val()),
			f = parseFloat($(selectors.fText, selectors.roiCalcWrapper).val()),
			h = parseFloat($(selectors.hText, selectors.roiCalcWrapper).val()),
			d = b * c,
			e = a * d,
			g = e * f,
			i = g * h,
			j = e / 12,
			k = e / a,
			l = i / a,
			m = (i / e)*(1/100),
			n = i / 12;

		//Set values
		$(selectors.dLbl, selectors.roiCalcWrapper).html(formatNumber(d));
		$(selectors.eLbl, selectors.roiCalcWrapper).html(formatNumber(e));
		$(selectors.gLbl, selectors.roiCalcWrapper).html(formatNumber(g));
		$(selectors.iLbl, selectors.roiCalcWrapper).html(formatNumber(i));
		$(selectors.jLbl, selectors.roiCalcWrapper).html(formatNumber(j));
		$(selectors.kLbl, selectors.roiCalcWrapper).html(formatNumber(k));
		$(selectors.lLbl, selectors.roiCalcWrapper).html(formatNumber(l));
		$(selectors.mLbl, selectors.roiCalcWrapper).html(m);
		$(selectors.nLbl, selectors.roiCalcWrapper).html(formatNumber(n));

		//Render Charts
		renderCharts(e, i, g);
	};

	var renderCharts = function(e, i, g) {
		$(selectors.chartContainer, selectors.roiCalcWrapper).highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Re-work'
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				title: {
					//text: 'Millions'
				}

			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					dataLabels: {
						enabled: true,
						//format: '{point.y} Millions'
					}
				}
			},

			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f} </b> of total<br/>'
			},

			series: [{
				name: 'Brands',
				colorByPoint: true,
				data: [{
					name: 'Re-work reduction',
					y: i
				}, {
					name: 'Loss from re-work',
					y: g
				}, {
					name: 'Total budget',
					y: e
				}]
			}]
		});
	};

	return {
		init: init
	};
}();

roiCalculator.init();