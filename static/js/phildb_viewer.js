var data = [];
function process_data(json) {
    console.log(json);
    for (var key in json) {
        data.push([new Date(key), json[key]]);
    };

    g = new Dygraph(document.getElementById("graph"), data,
         {
             legend: 'always',
             animatedZooms: true,
             title: 'Data plot'
         });
}

var sources = [];
function process_sources(json) {
    sources = json;
}

function update() {
    var script = document.getElementById('data_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var freq = document.getElementById('frequency');
    var ts_id = document.getElementById('timeseries_id');
    var source = document.getElementById('source');
    script.id = 'data_script';
    script.type = 'text/javascript';
    script.src = 'http://localhost:8888/' + ts_id.value + '/' + freq.value + '.json?source=' + source.value + '&callback=process_data';
    document.getElementsByTagName('head')[0].appendChild(script);
}

function update_sources() {
    var script = document.getElementById('source_script');
    script.parentNode.removeChild(script);
    script = document.createElement('script');
    var source = document.getElementById('source');
    script.id = 'source_script';
    script.type = 'text/javascript';
    script.src = 'http://localhost:8888/list_sources.json?&callback=process_sources';
    document.getElementsByTagName('head')[0].appendChild(script);
}
