# app.py
from flask import Flask, render_template, request, redirect, url_for
import requests

app = Flask(__name__)

GITHUB_API_URL = 'https://api.github.com/search/repositories'
PER_PAGE = 10  # Results per page

# Optional GitHub authentication
GITHUB_TOKEN = None  # Set your GitHub token here if needed for higher rate limits

def github_api_request(params):
    headers = {'Accept': 'application/vnd.github.v3+json'}
    if GITHUB_TOKEN:
        headers['Authorization'] = f'token {GITHUB_TOKEN}'
    response = requests.get(GITHUB_API_URL, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user_input = request.form.get('user_input')
        language = request.form.get('language')
        sort_by = request.form.get('sort_by')
        return redirect(url_for('results', query=user_input, language=language, sort_by=sort_by, page=1))
    return render_template('index.html')

@app.route('/results')
def results():
    query = request.args.get('query', '')
    language = request.args.get('language', '')
    sort_by = request.args.get('sort_by', 'best_match')
    page = int(request.args.get('page', 1))
    
    query_params = {'q': query, 'page': page, 'per_page': PER_PAGE, 'sort': sort_by}
    if language:
        query_params['q'] += f' language:{language}'
    
    try:
        data = github_api_request(query_params)
        repositories = data.get('items', [])
        total_count = data.get('total_count', 0)
    except requests.exceptions.RequestException as e:
        repositories = []
        total_count = 0
        error = str(e)
    else:
        error = None
    
    last_page = (total_count // PER_PAGE) + (1 if total_count % PER_PAGE > 0 else 0)
    next_page = page + 1 if page < last_page else None
    prev_page = page - 1 if page > 1 else None
    
    return render_template('results.html', query=query, language=language, sort_by=sort_by, repositories=repositories, error=error, next_page=next_page, prev_page=prev_page, last_page=last_page, current_page=page)

if __name__ == '__main__':
    app.run(debug=True)
