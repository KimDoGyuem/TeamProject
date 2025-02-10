import React from "react";
import './utilPages.css';

function EmployeePopup({ x, y, departmentList, projectList, employee, onDel, onClose }) {   //팝업창 컴포넌트

    const positions = [
        { value: '2', label: '사원' },
        { value: '1', label: '부장' },
        { value: '0', label: '사장' }
    ];

    if (projectList === null) { // 프로젝트 관리
        return (
            <div className='employee_popup_menu' style={{ top: y, left: x }}>
                <p>이름:{employee.company_name}</p>
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    직급:<select value={employee.p_rank} onChange={(e) => onClose(employee.company_id, e.target.value, '')}>
                        {positions.map((p,i) => (
                            <option key={i} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    부서:<select value={employee.department_name} onChange={(e) => onClose(employee.company_id, -1, e.target.value)}>
                        <option key='0' value='미정'>미정</option>
                        {departmentList.map((d) => (
                            <option key={d.department_no} value={d.department_name}>
                                {d.department_name}부서
                            </option>
                        ))}
                    </select>
                </div>
                <button onClick={(e) => {
                    onDel(employee.company_id);
                    onClose('x', -1, '');
                }}>해고</button>
                <button onClick={(e) => onClose('x', -1, '')}>닫기</button>
            </div>
        );
    }

    if (departmentList === null && onDel === null) { //프로젝트 관리 
        return (
            <div className='employee_popup_menu' style={{ top: y, left: x }}>
            <p>이름: {employee.company_name}</p>
            <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                프로젝트 추가:
                <select onChange={(e) => onClose(employee.company_id, parseInt(e.target.value))}>
                    <option value="0">선택하세요</option>
                    {projectList.map((p) => (
                        <option key={p.project_no} value={p.project_no}>
                            {p.project_name}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={() => onClose('x', -1)}>닫기</button>
        </div>
    );
    }
}

export default EmployeePopup;