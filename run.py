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

    option_template = Template('<option value="{{ value }}">{{ name }}</option>')

    source_options = []
    for o in db.list_sources():
        print(source_options)
        source_options.append(option_template.render(value = o, name = o))

    ts_ids = []
    for o in db.ts_list():
        ts_ids.append(option_template.render(value = o, name = o))

    return html_template.render(sources = '\n'.join(source_options), timeseries_ids = '\n'.join(ts_ids))

if __name__ == "__main__":
    app.run()
