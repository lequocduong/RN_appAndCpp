cmake_minimum_required(VERSION 3.22.1)
project("app_exp")

include_directories(src)

# Link against PyTorch and Android log libraries
find_library(jnigraphics-lib jnigraphics)
find_library(log-lib log)
find_library(android-lib android)

aux_source_directory(src SRC_LIST)
# Add this line to include the new cpp file
add_library( # Specifies the name of the library.
             ${CMAKE_PROJECT_NAME} 

             # Sets the library as a shared library.
             SHARED

             # Provides a relative path to your source file(s).
             native-lib.cpp 
             ${SRC_LIST}
             )

target_link_libraries(${CMAKE_PROJECT_NAME}
        ${log-lib}
        ${android-lib}
        ${jnigraphics-lib}       
)