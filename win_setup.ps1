# Check for administrator privileges
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run this script as an administrator"
    exit
}

# Run setup.sh script
sh setup.sh



# Change working directory to Server folder
Set-Location ".\Server"

# Check if the bettingexchangecommon file exists
if (Test-Path ".\bettingexchangecommon") {

  # Remove the bettingexchangecommon file
  Remove-Item ".\bettingexchangecommon" -Recurse
}

# Create symbolic link to Common folder
& cmd.exe /c mklink /D bettingexchangecommon ..\Common

# Change working directory to root folder
Set-Location "..\"



# Change working directory to Server folder
Set-Location ".\SportsDataFetcher"

# Check if the bettingexchangecommon file exists
if (Test-Path ".\bettingexchangecommon") {

  # Remove the bettingexchangecommon file
  Remove-Item ".\bettingexchangecommon" -Recurse
}

# Create symbolic link to Common folder
& cmd.exe /c mklink /D bettingexchangecommon ..\Common

# Change working directory to root folder
Set-Location "..\"

