$ErrorActionPreference = "Stop"

$output = Join-Path $PSScriptRoot "WildDogHereCMS.exe"
$source = @"
using System;
using System.Diagnostics;
using System.IO;

public class Program
{
    public static void Main()
    {
        string directory = AppDomain.CurrentDomain.BaseDirectory;
        string script = Path.Combine(directory, "Start-WildDogHere-CMS.cmd");

        if (!File.Exists(script))
        {
            Console.WriteLine("Cannot find Start-WildDogHere-CMS.cmd next to this exe.");
            Console.ReadKey();
            return;
        }

        ProcessStartInfo info = new ProcessStartInfo("cmd.exe", "/k \"" + script + "\"");
        info.WorkingDirectory = directory;
        info.UseShellExecute = true;
        Process.Start(info);
    }
}
"@

if (Test-Path $output) {
  Remove-Item $output
}

Add-Type -TypeDefinition $source -OutputAssembly $output -OutputType ConsoleApplication
Write-Host "Created $output"
