package com.raza.swaggergenerator;

import javax.annotation.security.RolesAllowed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;

@SpringBootApplication
@RestController
@CrossOrigin("http://localhost:4200")
public class SwaggerYamlGeneratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(SwaggerYamlGeneratorApplication.class, args);
	}

	@PostMapping("/swagger-yml")
	public String swaggerYml(@RequestBody String jsonClass) {
		return generateSwaggerYaml(jsonClass, false);
	}

	@PostMapping("/swaggermodel")
	public String swaggerModel(@RequestBody String jsonClass) {
		return generateSwaggerYaml(jsonClass, true);
	}

	private static String generateSwaggerYaml(String jsonClass, boolean createModel) {
		try {
			CompilationUnit compilationUnit = StaticJavaParser.parse(jsonClass);
			ClassOrInterfaceDeclaration classDeclaration = compilationUnit.findFirst(ClassOrInterfaceDeclaration.class)
					.orElse(null);

			if (classDeclaration != null) {
				StringBuilder yamlBuilder = new StringBuilder();
				if (!createModel) {
					yamlBuilder.append("openapi: 3.0.0\n");
					yamlBuilder.append("info:\n");
					yamlBuilder.append("  title: ").append(classDeclaration.getName()).append(" API\n");
					yamlBuilder.append("  version: 1.0.0\n");
					yamlBuilder.append("paths: {}\n");
					yamlBuilder.append("components:\n");
					yamlBuilder.append("  schemas:\n");
				}

				yamlBuilder.append("    ").append(classDeclaration.getName()).append(":\n");
				yamlBuilder.append("      type: object\n");
				yamlBuilder.append("      properties:\n");

				// Process fields
				classDeclaration.getFields().forEach(field -> {
					String fieldName = field.getVariables().get(0).getNameAsString();
					String fieldType = field.getElementType().asString();
					String swaggerType = mapToSwaggerType(fieldType);

					if (swaggerType != null) {
						yamlBuilder.append("        ").append(fieldName).append(":\n");
						yamlBuilder.append("          type: ").append(swaggerType).append("\n");
					}
				});
				String output = yamlBuilder.toString();
				System.out.println(output);
				return output;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private static String mapToSwaggerType(String fieldType) {
		switch (fieldType) {
		case "byte":
		case "short":
		case "int":
		case "long":
		case "float":
		case "double":
		case "Byte":
		case "Short":
		case "Integer":
		case "Long":
		case "Float":
		case "Double":
			return "number";
		case "boolean":
		case "Boolean":
			return "boolean";
		case "char":
		case "Character":
		case "String":
			return "string";
		// Add more mappings for other types as needed
		// case "YourCustomType":
		// return "object";
		default:
			return fieldType;

		}

	}
}
