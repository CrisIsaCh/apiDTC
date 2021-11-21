var express =require('express');
var mysql = require('mysql');
var cors = require('cors');
var app =express();
app.use(express.json());
app.use(cors());

var conexion =mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database:'paola'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("¡Conexion Exitosa a base de Datos!");
    }
})

app.get('/',function(req,res){
    res.send('Ruta INICIO');
})


app.get('/api/atenciones',(req,res)=>{
    conexion.query('SELECT * FROM atenciones',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);

        }
    })

});

app.get('/api/atenciones/:id',(req,res)=>{
    conexion.query('SELECT * FROM atenciones WHERE id =?',[req.params.id],(error,fila)=>{
        if(error){
           throw error;
        }else{
            res.send(fila);
           // res.send(fila[0].descripcion)

        }
    })

});

app.post('/api/atenciones/',(req,res)=>{
    let data ={
        marcaTemporal:req.body.marcaTemporal,
        noviembre:req.body.noviembre,
        usuario:req.body.usuario,
        motivoConsulta1:req.body.motivoConsulta1,
        motivoConsulta2:req.body.motivoConsulta2,
        motivoConsulta3:req.body.motivoConsulta3,
        motivoConsulta4:req.body.motivoConsulta4,
        profesional:req.body.profesional,
        seArticulo:req.body.seArticulo,
        comentarios:req.body.comentarios
    };
    let sql = "INSERT INTO atenciones SET ?";
    conexion.query(sql,data,function(error,result){
        if(error){
            throw error;
         }else{
             Object.assign(data,{id:result.insertId})
             res.send(data);
             
 
         }

    })

})

app.put('/api/atenciones/:id',(req,res)=>{
    let id= req.params.id;
    let marcaTemporal= req.body.marcaTemporal;
    let noviembre=req.body.noviembre;
    let usuario=req.body.usuario;
    let motivoConsulta1=req.body.motivoConsulta1;
    let motivoConsulta2=req.body.motivoConsulta2;
    let motivoConsulta3=req.body.motivoConsulta3;
    let motivoConsulta4=req.body.motivoConsulta4;
    let profesional=req.body.profesional;
    let seArticulo=req.body.seArticulo;
    let comentarios= req.body.comentarios;
    let sql="UPDATE atenciones SET marcaTemporal = ?,noviembre = ?,usuario = ?,motivoConsulta1 =?,motivoConsulta2 =?,motivoConsulta3 =?,motivoConsulta4 =?,profesional =?,seArticulo =?,comentarios =?  WHERE id= ?";
    
    conexion.query(sql,[marcaTemporal, noviembre, usuario, motivoConsulta1, motivoConsulta2, motivoConsulta3, motivoConsulta4, profesional, seArticulo, comentarios,id], function(error,results){
        if(error){
            throw error;
         }else{
             res.send(results);
             
 
         }
    });
});
app.delete('/api/atenciones/:id',(req,res)=>{
    conexion.query('DELETE FROM atenciones WHERE id =?',[req.params.id],function(error,filas){
        if(error){
            throw error;
         }else{
             res.send(filas);
             
 
         }
    })
})
//lISTAR USUARIOS
app.get('/api/usuario',(req,res)=>{
    conexion.query('SELECT  DISTINCT usuario  FROM atenciones ORDER BY usuario ASC',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});
//LISTAR PROFESIONALES
app.get('/api/profesionales',(req,res)=>{
    conexion.query('SELECT  DISTINCT profesional  FROM atenciones',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});

//listar motivo consulta

app.get('/api/motivo',(req,res)=>{
    conexion.query('SELECT DISTINCT  motivoConsulta1  FROM atenciones',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});

//listar se Articulo

app.get('/api/searticulo',(req,res)=>{
    conexion.query('SELECT DISTINCT  seArticulo  FROM atenciones',(error,filas)=>{
        if(error){
           throw error;
        }else{
            res.send(filas);
            

        }
    })

});



const puerto= process.env.PUERTO || 3000;

app.listen(puerto,function(){
    console.log("Servidor Ok en puerto:"+ puerto);
})