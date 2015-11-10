import sys
from jinja2 import Template
from flask import Flask
from phildb.database import PhilDB

app = Flask(__name__)

db = PhilDB(sys.argv[1])

@app.route("/")
def main():
    with open('index.j2') as t:
        html_template = Template(t.read())

    ts_ids = db.ts_list()

    anchor_template = Template('<li><a href="ts/{{ value }}">{{ name }}</a></li>')

    elements = []
    for ts_id in ts_ids:
        elements.append(anchor_template.render(value = ts_id, name = ts_id))

    content = "<ul>"
    content += '\n'.join(elements)
    content += "</ul>"

    return html_template.render(content = content)

@app.route("/selector")
def selector():
    with open('selector.j2') as t:
        html_template = Template(t.read())

    option_template = Template('<option value="{{ value }}">{{ name }}</option>')

    source_options = []
    for o in db.list_sources():
        source_options.append(option_template.render(value = o, name = o))

    measurand_options = []
    for o in db.list_measurands():
        measurand_options.append(option_template.render(value = o, name = o))

    return html_template.render(measurands = '\n'.join(measurand_options), sources = '\n'.join(source_options))

@app.route("/ts/<ts_id>")
def ts(ts_id):
    with open('ts.j2') as t:
        html_template = Template(t.read())

    instances = db.list_timeseries_instances(timeseries=ts_id)

    content = ""
    scripts = []
    for instance in instances.to_dict('records'):
        content += "<h2>{freq}, Measurand: {measurand}, Source: {source}</h2>".format(**instance)
        url = "http://localhost:8888" + '/' + ts_id + '/' + instance['freq'] + '.json?source=' + instance['source'] + '&measurand=' + instance['measurand'] +'&callback=process_data';
        scripts.append("<script type='text/javascript' src='{0}'></script>".format(url))

    return html_template.render(content = content, scripts = '\n'.join(scripts), ts_id = ts_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8890, debug=True)
