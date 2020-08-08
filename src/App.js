import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './App.css';
URL = "https://api.spacexdata.com/v3/launches?limit=10"; 
class App extends React.Component {
state = {
post: [],
allPosts: []
};
componentDidMount() {
axios
.get(URL, {
headers: {
Accept: "application/json",
"Content-Type": "application/json"
}
})
.then(({ data }) => {
this.setState({
post: data,
allPosts: data // array data from JSON stored in these
});
})
.catch(err => {});
}
_onKeyUp = e => {
// filter post list by title using onKeyUp function
const post = this.state.allPosts.filter(item =>
item.mission_name.toLowerCase().includes(e.target.value.toLowerCase())
);
this.setState({ post });
};
render() {
return (
<div className="container">
<div className="search-outer">
<form
role="search"
method="get"
id="searchform"
className="searchform"
action=""
>
Filter<input
type="search"
onChange={this._onKeyUp}
name="s"
id="s"
placeholder="Launch Year"
/>
<button type="submit" id="searchsubmit">
<i className="fa fa-search" aria-hidden="true" />
</button>
<button type ="button">2006</button>
<button type ="button">2007</button>
<button type ="button">2008</button>
</form>
</div>
<ul className="data-list">
{/* post items mapped in a list linked to onKeyUp function */}
{this.state.post.map((item, index) => (
<li className={"block-" + index}>
<div className="title">
<img src={item.links.mission_patch_small} />
<h3>{item.mission_name}</h3>
<h5>Mission Ids: {item.mission_id.length === 0 ? "0" : item.mission_id.map((id, index) => <span key={index}>{ (index ? ', ' : '') + id }</span>)}</h5>
<h5>Launch Year: {item.launch_year}</h5>
<h5>Successful Launch: {item.launch_success ? "True" : "False"}</h5>
<h5>Successful Landing: {item.launch_landing ? "True" : "False"}</h5>
</div>
</li>
))}
</ul>
</div>
);
}
}
export default App;

