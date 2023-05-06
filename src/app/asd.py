def ListaAsignacionTurnoSobrantes(modelo: cp_model.CpModel, mes: list[list], cont_semana: list, lista_turno_extra: list, meses_anio: list[str], month: int, month_prev: int ,lista_itinerario: list, itinerario: list[object], turnos_totales: list, planificacionAnterior: None):
      """ Se asigna a los empleados """
      LunesASabado = 5

      for semana in range(len(cont_semana)):
            cantidad_turno_extra = lista_turno_extra[semana]

            for diaSemana in range(cont_semana[semana]):

                  # Si no hay turno extra, se sale del for
                  if cantidad_turno_extra == 0: break
                  # Si hay turno extra, se sigue iterando
                  else:
                        jornada = [False, False, False]
                        itinerario_dia = [dia for dia in itinerario if dia["dia"] == mes[semana][diaSemana][1] ]
                        # Hay itinerario y turno extra
                        if itinerario_dia and cantidad_turno_extra >= 1:
                              # Hay itinerario
                              print("")
                        # No hay itinerario pero si turno extra
                        elif cantidad_turno_extra >= 1:
                              jornada[0] = True
                              vuelta = 2
                              for dia in itertools.cycle(range(cont_semana[semana])):
                                    print(mes[semana][dia][1])

                                    if cantidad_turno_extra == 0: break
                                    if jornada[0]: # Turno de la Mañana
                                          if dia <= LunesASabado:
                                                #modelo.Add(lista_itinerario[semana][dia][0] >= vuelta)
                                                
                                                if meses_anio[month-1] == mes[semana][dia][0]:
                                                      turnos_totales[0] = turnos_totales[0] + 1
                                                      cantidad_turno_extra = cantidad_turno_extra - 1 # Se agrego
                                                      
                                                elif meses_anio[month_prev-1] == mes[semana][dia][0]:
                                                      if planificacionAnterior == None:
                                                            turnos_totales[0] = turnos_totales[0] + 1
                                                            cantidad_turno_extra = cantidad_turno_extra -1

                                          else:
                                                jornada[0] = False
                                                jornada[1] = True
                                    
                                    elif jornada[1]: # Turno de la Tarde
                                          if dia <= LunesASabado:
                                                #modelo.Add(lista_itinerario[semana][dia][1] >= vuelta)
                                                #cantidad_turno_extra = cantidad_turno_extra - 1
                                                
                                                if meses_anio[month-1] == mes[semana][dia][0]:
                                                      turnos_totales[1] = turnos_totales[1] + 1
                                                      cantidad_turno_extra = cantidad_turno_extra - 1

                                                elif meses_anio[month_prev-1] == mes[semana][dia][0]:
                                                      if planificacionAnterior == None:
                                                            turnos_totales[1] = turnos_totales[1] + 1
                                                            cantidad_turno_extra = cantidad_turno_extra - 1

                                          else:
                                                jornada[1] = False
                                                jornada[2] = True
                                    
                                    elif jornada[2]: # Turno de la Noche
                                          if dia <= LunesASabado:
                                                #modelo.Add(lista_itinerario[semana][dia][2] >= vuelta)

                                                if meses_anio[month-1] == mes[semana][dia][0]:
                                                      turnos_totales[2] = turnos_totales[2] + 1
                                                      cantidad_turno_extra = cantidad_turno_extra - 1

                                                elif meses_anio[month_prev-1] == mes[semana][dia][0]:
                                                      if planificacionAnterior == None:
                                                            turnos_totales[2] = turnos_totales[2] + 1
                                                            cantidad_turno_extra = cantidad_turno_extra - 1
                                          else:
                                                jornada[2] = False
                                                jornada[0] = True
                                                vuelta = vuelta + 1

      return modelo, turnos_totales, lista_itinerario
