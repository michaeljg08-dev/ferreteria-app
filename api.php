<?php
/**
 * Backend para Ferretería HR
 * Maneja datos (JSON) y subida de imágenes.
 */

// Configuración básica
$ALLOWED_ORIGINS = ["*"]; 
$ADMIN_PASS = "12345"; // Debe coincidir con el del Dashboard
$DATA_FILE = "datos.json";
$UPLOAD_DIR = "uploads/";

// Crear carpeta de subidas si no existe
if (!file_exists($UPLOAD_DIR)) {
    mkdir($UPLOAD_DIR, 0755, true);
}

// Cabeceras CORS
header("Access-Control-Allow-Origin: " . implode(", ", $ALLOWED_ORIGINS));
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$action = $_GET['action'] ?? '';

// --- LÓGICA DE LECTURA (PÚBLICA) ---
if ($action === 'get') {
    if (file_exists($DATA_FILE)) {
        echo file_get_contents($DATA_FILE);
    } else {
        echo json_encode(["status" => "error", "message" => "No hay datos guardados"]);
    }
    exit;
}

// --- LÓGICA PROTEGIDA (REQUERE CONTRASEÑA) ---
$auth = $_REQUEST['pass'] ?? '';
if ($auth !== $ADMIN_PASS) {
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "No autorizado"]);
    exit;
}

// GUARDAR DATOS COMPLETOS
if ($action === 'save') {
    $raw = file_get_contents("php://input");
    if ($raw) {
        if (file_put_contents($DATA_FILE, $raw)) {
            echo json_encode(["status" => "ok", "message" => "Datos guardados correctamente"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al escribir el archivo"]);
        }
    }
    exit;
}

// SUBIR IMAGEN
if ($action === 'upload') {
    if (!isset($_FILES['file'])) {
        echo json_encode(["status" => "error", "message" => "No se envió ningún archivo"]);
        exit;
    }

    $file = $_FILES['file'];
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

    if (!in_array($ext, $allowed)) {
        echo json_encode(["status" => "error", "message" => "Extensión no permitida"]);
        exit;
    }

    $filename = time() . "_" . bin2hex(random_bytes(4)) . "." . $ext;
    $target = $UPLOAD_DIR . $filename;

    if (move_uploaded_file($file['tmp_name'], $target)) {
        // Devolver la ruta relativa para evitar problemas con localhost y diferentes IPs
        $url = $target;
        echo json_encode(["status" => "ok", "url" => $url]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al mover el archivo"]);
    }
    exit;
}

echo json_encode(["status" => "error", "message" => "Acción no válida"]);
?>
