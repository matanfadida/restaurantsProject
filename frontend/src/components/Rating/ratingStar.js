
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};



const Stars = (props) => {
  
  const stars = Array(5).fill(0)

  


  return (
    <div className={styles.container}>
      
      <div className={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              color={props.value > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
              }}
            />
          )
        })}
      </div>
      

      
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  

};




export default Stars;
 