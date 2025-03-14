import './utilPages.css';
import photo1 from "./photo1.png";
import photo2 from "./photo2.png";
import photo3 from "./photo3.png";
import photo4 from "./photo4.png";
import photo5 from "./photo5.png";




function EmployeeInformation({ name, position, level, onclickEvent }) {

    const getBackgroundImage = (level) => {
        switch (level) {
            case "1":
                return 'url('+photo1+')';
            case "2":
                return 'url('+photo2+')';
            case "3":
                return 'url('+photo3+')';
            case "4":
                return 'url('+photo4+')';
            case "5":
                return 'url('+photo5+')';
        }
    };

    const backgroundImage = getBackgroundImage(level);

    return (
        <div className={`employee_information`} style={{backgroundImage:backgroundImage}} onClick={onclickEvent}>
            <div id='info'>
                이름:{name}<br />
                직급:{position}
            </div>
        </div>
    );
}

export default EmployeeInformation;