import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../Context/auth';
const SearchStyle = styled('div')(({ theme }) => ({
    position: 'relative',
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",backgroundColor: "#e6e8e8"
  ,backdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
  webkitBackdropFilter: "blur(20px) saturate(160%) contrast(45%) brightness(140%)",
    borderRadius: "50px",
    backgroundColor: 'white' ,
    '&:hover': {
      backgroundColor: "white",
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '52ch',
        '&:focus': {
          width: '60ch',
        },
      },
      
    },
  }));
  



const Search = () => {
     const [query, setQuery] = React.useState('');
const {data,setFiltered} = useAuth();
console.log(query)
  React.useEffect(() => {
    setFiltered(
      data?.filter(d => 
        d?.title?(d?.title?.toLowerCase().includes(query.toLowerCase())):(d?.name?.toLowerCase().includes(query.toLowerCase()))
      )
    );
  }, [query, data]);
  return (
    <> <SearchStyle>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ 'aria-label': 'search' }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </SearchStyle></>
  )
}

export default Search