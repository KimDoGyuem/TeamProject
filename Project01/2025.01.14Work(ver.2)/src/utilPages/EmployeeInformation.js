import './utilPages.css';

function EmployeeInformation({ name, position, xxx }) { //직원 카드 컴포넌트

    return (
        <div className={`employee_information ${name}`} onClick={xxx}>
            <div id='info'>
                이름:{name}<br />
                직급:{position}
            </div>
        </div>
    );
}

export default EmployeeInformation;