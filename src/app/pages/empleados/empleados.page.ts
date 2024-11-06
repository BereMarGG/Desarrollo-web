import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import qs from 'qs';



@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  data_empleados: any[] = [];
  newItem: string = '';
  errorMessage: string = '';


  constructor(private alertController: AlertController) {}

  ngOnInit() {

    this.fetchdata_empleados()
  }

  async opciones_newUser(){
    try{

      const departamentos_opciones = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Departamentos/get_departamentos');


    } catch(error){

      
    }
  }

  async editarEmpleado(empleado: any) {
    const alert = await this.alertController.create({
      header: 'Editar Empleado',
      inputs: [
        { name: 'employee_id', type: 'text', placeholder: 'ID', value: empleado.employee_id, disabled: true },
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: empleado.first_name },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: empleado.last_name },
        { name: 'email', type: 'email', placeholder: 'Email', value: empleado.email },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: empleado.phone },
        { name: 'department_name', type: 'text', placeholder: 'Departamento', value: empleado.department_name },
        { name: 'position_name', type: 'text', placeholder: 'Posición', value: empleado.position_name }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: async (data) => {
            const updatedData = {
              employee_id: empleado.employee_id,  // Asegúrate de incluir el ID del empleado
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: data.department_name,
              position_name: data.position_name
            };
  
            try {
              // Envía los datos al servidor usando Axios


              console.log("Soy data editado empleado", updatedData);
              return;
              
              const response = await axios.put(`http://tu-servidor/api/empleados/${updatedData.employee_id}`, updatedData);
  
              if (response.status === 200) {
                // Actualiza el objeto empleado localmente con los nuevos valores
                Object.assign(empleado, updatedData); // Actualiza empleado con los nuevos valores
                // Puedes mostrar un mensaje de éxito aquí
              }
            } catch (error) {
              console.error('Error al actualizar el empleado', error);
              // Maneja el error, muestra un mensaje al usuario, etc.
            }
          }
        }
      ]
    });
    await alert.present();
  }
  
  



  async agregarEmpleado() {
    const alert = await this.alertController.create({
      header: 'Agregar nuevo empleado',
      inputs: [
        { name: 'first_name', type: 'text', placeholder: 'Nombre', value: '' },
        { name: 'last_name', type: 'text', placeholder: 'Apellidos', value: '' },
        { name: 'email', type: 'email', placeholder: 'Email', value: '' },
        { name: 'phone', type: 'tel', placeholder: 'Teléfono', value: '' },
        { name: 'department_name', type: 'text', placeholder: 'Departamento', value: '' },
        { name: 'position_name', type: 'text', placeholder: 'Posición', value: '' },
        {}
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const newData = {

              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              department_name: data.department_name,
              position_name: data.position_name
            };

            try{

              console.log("Soy new Data. . .", newData);


            }catch{

            }
       
          
            },
        },
      ],
    });
    await alert.present();
  }

  async fetchdata_empleados(){

    try{
      const response = await axios.get('http://localhost/quicky_coffee/proyecto_escuela/Empleados/get_empleados');

      this.data_empleados = response.data;

      console.log("Soy empleados . ", this.data_empleados);

      
    }catch(error){
      this.errorMessage = 'Error fetching data';
      console.log(error);


    }



  }


  async changeStatus(id: number, estatus: number){

    console.log("Soy el id del usuario . .", id);

    console.log("Soy el estatus del usuario . . ", estatus);




  }

  async eliminarEmpleado(id: number){

    console.log("Soy borrar usuario . . .", id);



  }
}
