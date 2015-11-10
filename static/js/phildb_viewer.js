var data = [];
function process_data(json) {
    data = [];
    console.log(json);
    for (var key in json) {
        data.push([new Date(key), json[key]]);
    };
    var ts_id = document.getElementById('timeseries_id').value;
    g = new Dygraph(document.getElementById("graph"), data,
         {
             width: 800,
             animatedZooms: true,
             title: ts_id
         });
}

function process_matches(json) {
    var html = '';
    json.forEach(function(timeseries_id) {
        html += '  <option value="' + timeseries_id + '">' + timeseries_id + "</option>\n";
    });
    document.getElementById('timeseries_id').innerHTML = html;
}

function filter() {
    var script = document.getElementById('ts_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var freq = document.getElementById('frequency');
    var ts_id = document.getElementById('timeseries_id');
    var source = document.getElementById('source');
    var measurand = document.getElementById('measurand');
    script.id = 'ts_script';
    script.type = 'text/javascript';
    script.src = config.phildb_host + '/list/timeseries.json?source=' + source.value + '&measurand=' + measurand.value +'&callback=process_matches';
    document.getElementsByTagName('head')[0].appendChild(script);
}

var sources = [];
function process_sources(json) {
    sources = json;
}

var measurands = [];
function process_measurands(json) {
    measurands = json;
}

function update() {
    var script = document.getElementById('data_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var freq = document.getElementById('frequency');
    var ts_id = document.getElementById('timeseries_id');
    var source = document.getElementById('source');
    var measurand = document.getElementById('measurand');
    script.id = 'data_script';
    script.type = 'text/javascript';
    script.src = config.phildb_host + '/' + ts_id.value + '/' + freq.value + '.json?source=' + source.value + '&measurand=' + measurand.value +'&callback=process_data';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function update_sources() {
    var script = document.getElementById('source_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var source = document.getElementById('source');
    script.id = 'source_script';
    script.type = 'text/javascript';
    script.src = config.phildb_host + '/list_sources.json?&callback=process_sources';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function update_measurands() {
    var script = document.getElementById('measurand_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var measurand = document.getElementById('measurand');
    script.id = 'measurand_script';
    script.type = 'text/javascript';
    script.src = config.phildb_host + '/list_measurands.json?&callback=process_measurands';
    document.getElementsByTagName('head')[0].appendChild(script);
}
