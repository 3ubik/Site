import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


export const Tablelist = ({ table }) => {

    
    if (table.lenght) {

        return <p className="center">no</p>
    }
    function onRowSelect(row, isSelected, e) {
        let rowStr = '';
        for (const prop in row) {
          rowStr += prop + ': "' + row[prop] + '"';
        }
        console.log(e);
        //alert(`is selected: ${isSelected}, ${rowStr}`);
      }
      
      function onSelectAll(isSelected, rows) {
        /*alert(`is select all: ${isSelected}`);
       if (isSelected) {
          alert('Current display and selected data: ');
        } else {
          alert('unselect rows: ');
        }
        for (let i = 0; i < rows.length; i++) {
          alert(rows[i].id);
        }*/
      }
    
    
    const selectRowProp={
        mode: "checkbox",
        bgColor:"red",
        clickToSelect: true,
         onSelect: onRowSelect,
         onSelectAll: onSelectAll

    }

    
      
      
        
          return (
              

              <div>
            <BootstrapTable data={ table } deleteRow = {true} selectRow={ selectRowProp }>
                <TableHeaderColumn dataField="_id" isKey={true} width="25%">ID</TableHeaderColumn>
                <TableHeaderColumn dataField="login" width="25%">Login</TableHeaderColumn>
                <TableHeaderColumn dataField="email" width="25%">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="dateOfRegistration" width="25%">dateOfRegistration</TableHeaderColumn>
            </BootstrapTable>
            </div>
            
          );
        
      


    
          
        
    
}