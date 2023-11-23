import  { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/");
  }
  return (
    <nav style={{  display:'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 23px', backgroundColor:'rgba(241, 248, 252)', color: '#fff', position:'fixed', width:'98%'}}>
      <div style={{color:'black' , background:'transparent', fontSize:20}}>Welcome to todo list </div>
      <div style={{background:'transparent'}}>
        <button onClick={onLogout} style={{ background:'transparent',border: 'none', color: 'black', cursor: 'pointer', borderRadius:0 }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
