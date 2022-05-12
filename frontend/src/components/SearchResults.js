import React, {useState} from 'react';
import SongList from './SongList';
class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: false,
            searchResults: [],
            isLoaded: false,
            onAdd: false,
        };
    }
    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('http://127.0.0.1:80/api/songs', {method: 'GET', mode: 'cors',}
        ).then(response => {
          console.log(response)
          if(response.status === 200){
            (response.json()).then((data) => {
              //this.setState({songs: data['songs']})
              console.log(data)
              this.setState({
                isLoaded: true,
                searchResults: data.songs
              });
            })
          } else {
            (response.json()).then(() => {
              this.setState({songs: 'error'})
            })
          }
        }).catch((error) => {
            console.log("Error in fetching.", error)
        })
    }
    
    render () {
        const { search, searchResults, isLoaded, onAdd } = this.state
        if(!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <>
                    <div className="songList">
                        <SearchBar onSearch={search} />
                        <SongList songs={searchResults} onAdd={onAdd} />
                    </div>
                </>
            )
        }
    }
}
const SearchBar = ({onSearch}) => {
    const [term, setTerm] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    };
    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input id="searchBar" type="text" placeholder="Song, album or artist name" onChange={(e) => setTerm(e.target.value)} />
                <button className="btn" onClick={handleSubmit}>SEARCH</button>
            </form>
        </>
    );
};
export default SearchResults