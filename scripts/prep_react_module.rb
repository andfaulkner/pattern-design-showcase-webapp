#!/usr/bin/env ruby
require('fileutils.rb')
react_package_path = "node_modules/react/package.json"

if File.file?(react_package_path)
	puts "restructuring react module for easier use with webpack"
	react_package = File.open(react_package_path, "r")
	react_package_content = react_package.map do |line|
		line.gsub("\"main\": \"react\.js\"", "\"main\": \"react.min.js\"")
	end
	react_package.close

	File.open(react_package_path, "w") do |package_json|
		package_json.write(react_package_content.join)
	end

	FileUtils.cp('node_modules/react/dist/react.min.js', 'node_modules/react/react.min.js')
end