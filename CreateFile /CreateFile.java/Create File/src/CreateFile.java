import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.Scanner;

public class CreateFile {

	public static String strAllowedDirectory = "C:\\UserContent";
	public static String strDisallowedExtension = ".exe";
	public static String strDirectory, strFileName, strData;

	static {
		if (System.getProperty("os.name").toLowerCase().indexOf("mac") >=0) {
			strAllowedDirectory = "/tmp/UserContent";
			strDisallowedExtension = ".sh";
		}
	}



	public static void collectUserInput() {

		Scanner scanner = new Scanner(System.in);

		System.out.print("Please enter a directory: ");
		strDirectory 	= scanner.nextLine();
		System.out.print("Please enter a filename: ");
		strFileName 	= scanner.nextLine();
		System.out.println("Please enter some data:");
		strData 		= scanner.nextLine();
		scanner.close();

	}

	public static void writeFile() {

		File file = new File(strDirectory + strFileName);

		try {
			Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(file)));
			writer.write(strData);
			writer.close();
		}

		catch (IOException e) {
			emitError(e.getMessage());
		}

		finally {
			System.out.println(
			"\nWrote " + strData.length() +
			" bytes to " + file.getPath() +
			"\nHave a nice day!");
		}

	}

	public static void emitError(String message) {

		System.out.println("\n" + message);
		System.exit(1);

	}

	public static boolean securityCheckOK() {

		/*==========================================================================*\
		||																																					||
		||		YOUR CODE GOES HERE:																									||
		||																																					||
		||			1)Make sure strDirectory IS under strAllowedDirectory root					||
		||			2)Make sure strFileName  IS NOT of strDisallowedExtension						||
		||																																					||
		\*==========================================================================*/

		return true;

	}

	public static void main(String[] args) {

		collectUserInput();

		if (securityCheckOK())
			writeFile();
		else
			emitError("DO NOT HACK US!!!");

	}

}
